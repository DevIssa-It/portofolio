/**
 * Canonical Project Domain Contracts
 * Single Source of Truth (SSOT) for Project entities
 */

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  tags: string[]
  github: string
  demo: string
  createdAt?: string
  updatedAt?: string
}

export type CreateProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string
}

export type UpdateProjectInput = Partial<Omit<Project, 'id'>> & {
  id: string
}

export interface GitHubSyncPayload {
  title: string
  description: string
  github: string
  demo: string
  technologies: string[]
  tags: string[]
  image?: string
}

export interface SyncResult {
  totalProcessed: number
  createdCount: number
  updatedCount: number
  skippedCount: number
  syncedRepositories: string[]
  errors: string[]
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
