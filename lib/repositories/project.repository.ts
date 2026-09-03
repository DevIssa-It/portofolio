/**
 * Project Repository Facade
 * Mediates between PostgreSQL database and filesystem fallback.
 * Adheres to SRP, SoC, and Repository Pattern.
 */

import { isDatabaseAvailable } from '@/lib/db'
import { sqlProjectStorage, SqlProjectStorage } from './sql-project.storage'
import { jsonProjectStorage, JsonProjectStorage } from './json-project.storage'
import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  GitHubSyncPayload,
} from '@/types/project'

export class ProjectRepository {
  constructor(
    private readonly sqlStorage: SqlProjectStorage = sqlProjectStorage,
    private readonly jsonStorage: JsonProjectStorage = jsonProjectStorage
  ) {}

  private async getActiveStorage() {
    const isDbReady = await isDatabaseAvailable()
    return isDbReady ? this.sqlStorage : this.jsonStorage
  }

  async findAll(): Promise<Project[]> {
    const storage = await this.getActiveStorage()
    return storage.findAll()
  }

  async findById(id: string): Promise<Project | null> {
    const storage = await this.getActiveStorage()
    return storage.findById(id)
  }

  async findByGithubUrl(githubUrl: string): Promise<Project | null> {
    const storage = await this.getActiveStorage()
    return storage.findByGithubUrl(githubUrl)
  }

  async create(data: CreateProjectInput): Promise<Project> {
    const storage = await this.getActiveStorage()
    return storage.create(data)
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project | null> {
    const storage = await this.getActiveStorage()
    return storage.update(id, data)
  }

  async delete(id: string): Promise<boolean> {
    const storage = await this.getActiveStorage()
    return storage.delete(id)
  }

  async upsertFromGithub(
    payload: GitHubSyncPayload
  ): Promise<{ action: 'created' | 'updated' | 'skipped'; project: Project }> {
    const existing = await this.findByGithubUrl(payload.github)

    if (existing) {
      const needsUpdate =
        existing.description !== payload.description ||
        existing.demo !== payload.demo ||
        existing.title !== payload.title ||
        JSON.stringify(existing.technologies) !== JSON.stringify(payload.technologies)

      if (!needsUpdate) {
        return { action: 'skipped', project: existing }
      }

      const updated = await this.update(existing.id, {
        id: existing.id,
        title: payload.title,
        description: payload.description,
        demo: payload.demo || existing.demo,
        technologies: payload.technologies.length > 0 ? payload.technologies : existing.technologies,
        tags: Array.from(new Set([...existing.tags, ...payload.tags])),
        image: existing.image || payload.image || '',
      })

      return { action: 'updated', project: updated || existing }
    }

    const created = await this.create({
      title: payload.title,
      description: payload.description,
      github: payload.github,
      demo: payload.demo,
      technologies: payload.technologies,
      tags: payload.tags,
      image: payload.image || '',
    })

    return { action: 'created', project: created }
  }
}

export const projectRepository = new ProjectRepository()
