/**
 * GitHub Integration Client
 * Encapsulates communication with GitHub REST API and Webhooks.
 * Strictly guarantees isolation of private repositories.
 */

import crypto from 'crypto'
import { APP_CONFIG } from '@/lib/config'
import { GitHubRepo } from '@/types/github'

export class GitHubClient {
  private readonly baseUrl: string
  private readonly token: string

  constructor() {
    this.baseUrl = APP_CONFIG.github.apiBaseUrl
    this.token = APP_CONFIG.github.apiToken
  }

  private getRequestHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App/1.0',
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  /**
   * Fetch public repositories for a given username
   * Strict security filter: private and forked repositories are excluded
   */
  async fetchPublicRepositories(username?: string): Promise<GitHubRepo[]> {
    const targetUsername = username || APP_CONFIG.github.defaultUsername

    const url = `${this.baseUrl}/users/${encodeURIComponent(targetUsername)}/repos?sort=updated&direction=desc&per_page=100`

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getRequestHeaders(),
      // Revalidate cache every 1 hour (3600 seconds)
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(
        `GitHub API responded with status ${response.status}: ${errorBody}`
      )
    }

    const repos: GitHubRepo[] = await response.json()

    // Strict security and relevance filtering
    return repos.filter((repo) => {
      // Exclude private repos without exception
      if (repo.private) {
        return false
      }

      // Exclude forks to keep portfolio focused on original work
      if (repo.fork) {
        return false
      }

      // Optional topic filtering if configured
      if (APP_CONFIG.github.requiredTopic) {
        const topics = repo.topics || []
        if (!topics.includes(APP_CONFIG.github.requiredTopic.toLowerCase())) {
          return false
        }
      }

      return true
    })
  }

  /**
   * Verify HMAC SHA-256 signature for GitHub Webhook payloads
   */
  verifyWebhookSignature(
    rawPayload: string,
    signatureHeader: string | null,
    secret: string
  ): boolean {
    if (!signatureHeader || !secret) {
      return false
    }

    const hmac = crypto.createHmac('sha256', secret)
    const digest = 'sha256=' + hmac.update(rawPayload).digest('hex')

    try {
      return crypto.timingSafeEqual(
        Buffer.from(digest),
        Buffer.from(signatureHeader)
      )
    } catch {
      return false
    }
  }
}

export const githubClient = new GitHubClient()
