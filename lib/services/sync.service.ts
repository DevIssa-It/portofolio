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
import { APP_CONFIG } from '@/lib/config'
import { determineProjectCategory } from '@/lib/utils/project-categorizer'

export class SyncService {
  constructor(
    private readonly client: GitHubClient = githubClient,
    private readonly repository: ProjectRepository = projectRepository
  ) {}

  /**
   * Convert GitHub repository metadata into a normalized project sync payload
   */
  private async mapRepoToSyncPayload(repo: GitHubRepo): Promise<GitHubSyncPayload> {
    const formattedTitle = repo.name
      .split(/[-_]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    const packageTechs = await this.client.detectRepositoryTechnologies(repo.name)
    const techSet = new Set<string>(packageTechs)
    if (repo.language) techSet.add(repo.language)

    if (repo.topics && Array.isArray(repo.topics)) {
      repo.topics.forEach((t) => {
        const lower = t.toLowerCase()
        if (lower.includes('next')) techSet.add('Next.js')
        if (lower.includes('react')) techSet.add('React.js')
        if (lower.includes('tailwind')) techSet.add('Tailwind CSS')
        if (lower.includes('vue')) techSet.add('Vue.js')
      })
    }
    const technologies: string[] = Array.from(techSet)

    const tags: string[] = ['Open Source']
    if (repo.topics && Array.isArray(repo.topics)) {
      repo.topics.forEach((topic) => {
        const normalized = topic.trim()
        if (normalized && !tags.includes(normalized)) {
          tags.push(normalized)
        }
      })
    }

    const autoImage = this.generateAutoImage(repo)
    const liveDeployment = await this.client.fetchLatestDeploymentUrl(repo.name)
    const demo = liveDeployment || repo.homepage || ''

    const category = determineProjectCategory({
      title: formattedTitle,
      description: repo.description || '',
      technologies,
      tags,
      topics: repo.topics || [],
      demo,
    })

    return {
      title: formattedTitle,
      description: repo.description || 'Open source project on GitHub.',
      github: repo.html_url,
      demo,
      technologies,
      tags,
      image: autoImage,
      category,
      createdAt: repo.created_at,
    }
  }

  /**
   * Determine the best automatic preview image:
   * Priority 1: Website screenshot if live demo URL exists
   * Priority 2: Official GitHub OpenGraph repository card
   */
  private generateAutoImage(repo: GitHubRepo): string {
    const homepage = repo.homepage?.trim()
    if (homepage && (homepage.startsWith('http://') || homepage.startsWith('https://'))) {
      return `https://s0.wp.com/mshots/v1/${encodeURIComponent(homepage)}?w=800&h=500`
    }

    if (repo.full_name) {
      return `https://opengraph.githubassets.com/1/${repo.full_name}`
    }

    return ''
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
          const payload = await this.mapRepoToSyncPayload(repo)
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

    // Strictly ignore excluded trial/template/assignment repositories
    const normalizedName = repository.name.toLowerCase().trim()
    if (APP_CONFIG.github.excludedRepos.includes(normalizedName)) {
      return { status: 'ignored', message: `Repository ${repository.name} is excluded` }
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
      const syncPayload = await this.mapRepoToSyncPayload(repository)
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
