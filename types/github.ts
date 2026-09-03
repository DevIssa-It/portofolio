/**
 * GitHub Integration Domain Contracts
 * Represents raw payloads from GitHub REST API and Webhooks
 */

export interface GitHubRepo {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  topics?: string[]
  visibility?: string
  default_branch: string
}

export interface GitHubWebhookPayload {
  action: 'created' | 'deleted' | 'edited' | 'publicized' | 'privatized' | string
  repository: GitHubRepo
  sender: {
    login: string
    id: number
    avatar_url: string
  }
}
