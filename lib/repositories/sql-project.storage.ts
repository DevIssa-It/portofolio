/**
 * SQL Storage Provider for Projects
 * Direct database operations on Neon Serverless PostgreSQL.
 */

import { sql } from '@/lib/db'
import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from '@/types/project'

export class SqlProjectStorage {
  async findAll(): Promise<Project[]> {
    const rows = await sql`
      SELECT 
        id, title, description, image, technologies, tags, github, demo,
        "createdAt", "updatedAt"
      FROM "Project" 
      ORDER BY "createdAt" DESC
    `
    return rows as Project[]
  }

  async findById(id: string): Promise<Project | null> {
    const rows = await sql`
      SELECT 
        id, title, description, image, technologies, tags, github, demo,
        "createdAt", "updatedAt"
      FROM "Project" 
      WHERE id = ${id}
      LIMIT 1
    `
    return (rows[0] as Project) || null
  }

  async findByGithubUrl(githubUrl: string): Promise<Project | null> {
    const normalizedUrl = githubUrl.trim().toLowerCase().replace(/\/+$/, '')
    const rows = await sql`
      SELECT 
        id, title, description, image, technologies, tags, github, demo,
        "createdAt", "updatedAt"
      FROM "Project" 
      WHERE LOWER(TRIM(TRAILING '/' FROM github)) = ${normalizedUrl}
      LIMIT 1
    `
    return (rows[0] as Project) || null
  }

  async create(data: CreateProjectInput): Promise<Project> {
    const id = data.id || Date.now().toString()
    const createdAt = data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString()
    const rows = await sql`
      INSERT INTO "Project" (
        id, title, description, image, technologies, tags, github, demo, "createdAt", "updatedAt"
      )
      VALUES (
        ${id}, 
        ${data.title}, 
        ${data.description}, 
        ${data.image || ''}, 
        ${data.technologies || []}, 
        ${data.tags || []}, 
        ${data.github || ''}, 
        ${data.demo || ''}, 
        ${createdAt}, 
        NOW()
      )
      RETURNING *
    `
    return rows[0] as Project
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project | null> {
    const existing = await this.findById(id)
    if (!existing) return null

    const rows = await sql`
      UPDATE "Project"
      SET 
        title = ${data.title !== undefined ? data.title : existing.title}, 
        description = ${data.description !== undefined ? data.description : existing.description}, 
        image = ${data.image !== undefined ? data.image : existing.image}, 
        technologies = ${data.technologies !== undefined ? data.technologies : existing.technologies}, 
        tags = ${data.tags !== undefined ? data.tags : existing.tags}, 
        github = ${data.github !== undefined ? data.github : existing.github}, 
        demo = ${data.demo !== undefined ? data.demo : existing.demo}, 
        "createdAt" = ${data.createdAt !== undefined ? data.createdAt : existing.createdAt},
        "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return (rows[0] as Project) || null
  }

  async delete(id: string): Promise<boolean> {
    const result = await sql`
      DELETE FROM "Project"
      WHERE id = ${id}
      RETURNING id
    `
    return result.length > 0
  }
}

export const sqlProjectStorage = new SqlProjectStorage()
