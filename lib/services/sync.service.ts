/**
 * GitHub Synchronization Business Service
 * Orchestrates mapping, filtering, and persisting projects from GitHub.
 * Adheres to Clean Architecture and Single Responsibility Principle.
 */

import { githubClient, GitHubClient } from '@/lib/integrations/github.client'
import {
  projectRepository,
  ProjectRepository,
} from '@/lib/repositories/project.repository'
import { GitHubRepo, GitHubWebhookPayload } from '@/types/github'
import { GitHubSyncPayload, SyncResult } from '@/types/project'

export class SyncService {
  constructor(
    private readonly client: GitHubClient = githubClient,
    private readonly repository: ProjectRepository = projectRepository
  ) {}

  /**
   * Convert GitHub repository metadata into a normalized project sync payload
   */
  private mapRepoToSyncPayload(repo: GitHubRepo): GitHubSyncPayload {
    // Format human-friendly title from repository name (e.g. 'ecommerce-catalog' -> 'Ecommerce Catalog')
    const formattedTitle = repo.name
      .split(/[-_]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    const technologies: string[] = []
    if (repo.language) {
      technologies.push(repo.language)
    }

    const tags: string[] = ['Open Source']
    if (repo.topics && Array.isArray(repo.topics)) {
      repo.topics.forEach((topic) => {
        const normalized = topic.trim()
        if (normalized && !tags.includes(normalized)) {
          tags.push(normalized)
        }
      })
    }

    return {
      title: formattedTitle,
      description: repo.description || 'Open source project on GitHub.',
      github: repo.html_url,
      demo: repo.homepage || '',
      technologies,
      tags,
    }
  }

  /**
   * Synchronize public repositories from GitHub to the portfolio database
   */
  async syncRepositories(username?: string): Promise<SyncResult> {
    const result: SyncResult = {
      totalProcessed: 0,
      createdCount: 0,
      updatedCount: 0,
      skippedCount: 0,
      syncedRepositories: [],
      errors: [],
    }

    try {
      const publicRepos = await this.client.fetchPublicRepositories(username)
      result.totalProcessed = publicRepos.length

      for (const repo of publicRepos) {
        try {
          const payload = this.mapRepoToSyncPayload(repo)
          const { action, project } = await this.repository.upsertFromGithub(payload)

          result.syncedRepositories.push(project.title)

          if (action === 'created') {
            result.createdCount += 1
          } else if (action === 'updated') {
            result.updatedCount += 1
          } else {
            result.skippedCount += 1
          }
        } catch (itemError) {
          const errorMessage =
            itemError instanceof Error
              ? itemError.message
              : 'Unknown processing error'
          result.errors.push(`Failed to sync ${repo.name}: ${errorMessage}`)
        }
      }

      return result
    } catch (networkError) {
      const errorMessage =
        networkError instanceof Error
          ? networkError.message
          : 'Failed to fetch repositories'
      result.errors.push(errorMessage)
      return result
    }
  }

  /**
   * Handle incoming GitHub webhook events in real time
   */
  async handleWebhookEvent(
    event: string,
    payload: GitHubWebhookPayload
  ): Promise<{ status: string; message: string }> {
    const { action, repository } = payload

    if (!repository) {
      return { status: 'ignored', message: 'No repository payload present' }
    }

    // Strictly ignore private repositories
    if (repository.private) {
      return { status: 'ignored', message: 'Private repository skipped' }
    }

    // Handle repository deleted event
    if (action === 'deleted') {
      const existing = await this.repository.findByGithubUrl(repository.html_url)
      if (existing) {
        await this.repository.delete(existing.id)
        return { status: 'deleted', message: `Project ${existing.title} removed` }
      }
      return { status: 'ignored', message: 'Project not found in portfolio' }
    }

    // Handle created, publicized, or updated events
    if (action === 'created' || action === 'publicized' || action === 'edited') {
      const syncPayload = this.mapRepoToSyncPayload(repository)
      const { action: outcome, project } =
        await this.repository.upsertFromGithub(syncPayload)

      return {
        status: outcome,
        message: `Project ${project.title} successfully ${outcome}`,
      }
    }

    return {
      status: 'ignored',
      message: `Event action ${action} not handled`,
    }
  }
}

export const syncService = new SyncService()
