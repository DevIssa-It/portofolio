/**
 * Canonical Project Domain Contracts
 * Single Source of Truth (SSOT) for Project entities
 */

export type ProjectCategory = 'all' | 'enterprise' | 'web-app' | 'api-tool' | 'open-source'

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
  category?: ProjectCategory
  role?: string
  problemStatement?: string
  architectureSolution?: string
  architectureNodes?: {
    id: string
    label: string
    type: 'client' | 'edge' | 'server' | 'db' | 'auth'
    detail: string
  }[]
  keyMetrics?: string[]
  featured?: boolean
}

export type CreateProjectInput = Omit<Project, 'id' | 'updatedAt'> & {
  id?: string
  createdAt?: string
}

export type UpdateProjectInput = Partial<Omit<Project, 'id'>> & {
  id: string
  createdAt?: string
}

export interface GitHubSyncPayload {
  title: string
  description: string
  github: string
  demo: string
  technologies: string[]
  tags: string[]
  image?: string
  createdAt?: string
  category?: ProjectCategory
  role?: string
  problemStatement?: string
  architectureSolution?: string
  keyMetrics?: string[]
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
