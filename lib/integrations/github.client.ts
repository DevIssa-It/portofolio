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

      // Exclude specified trial, template, or course projects
      const normalizedName = repo.name.toLowerCase().trim()
      if (APP_CONFIG.github.excludedRepos.includes(normalizedName)) {
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

  /**
   * Automatically detect technologies from package.json in repository
   */
  async detectRepositoryTechnologies(repoName: string, owner?: string): Promise<string[]> {
    const targetOwner = owner || APP_CONFIG.github.defaultUsername
    const branches = ['main', 'master']
    const detected = new Set<string>()

    for (const branch of branches) {
      try {
        const url = `https://raw.githubusercontent.com/${encodeURIComponent(targetOwner)}/${encodeURIComponent(repoName)}/${branch}/package.json`
        const res = await fetch(url, {
          headers: this.getRequestHeaders(),
          next: { revalidate: 3600 },
        })
        if (res.ok) {
          const pkg = await res.json()
          const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
          if (deps['next']) detected.add('Next.js')
          if (deps['react']) detected.add('React.js')
          if (deps['vue']) detected.add('Vue.js')
          if (deps['tailwindcss']) detected.add('Tailwind CSS')
          if (deps['typescript']) detected.add('TypeScript')
          if (deps['@prisma/client'] || deps['prisma']) detected.add('Prisma')
          if (deps['express']) detected.add('Express.js')
          if (deps['framer-motion']) detected.add('Framer Motion')
          break
        }
      } catch {
        // Try fallback branch
      }
    }
    return Array.from(detected)
  }

  /**
   * Fetch verified live production deployment URL from GitHub Deployments
   */
  async fetchLatestDeploymentUrl(repoName: string, owner?: string): Promise<string | null> {
    const targetOwner = owner || APP_CONFIG.github.defaultUsername
    try {
      const url = `${this.baseUrl}/repos/${encodeURIComponent(targetOwner)}/${encodeURIComponent(repoName)}/deployments?per_page=5`
      const res = await fetch(url, { headers: this.getRequestHeaders(), next: { revalidate: 3600 } })
      if (!res.ok) return null
      const deployments = await res.json()
      for (const d of deployments) {
        if (d.statuses_url) {
          const stRes = await fetch(d.statuses_url, { headers: this.getRequestHeaders(), next: { revalidate: 3600 } })
          if (stRes.ok) {
            const statuses = await stRes.json()
            const success = statuses.find((s: any) => s.state === 'success' && (s.environment_url || s.target_url))
            if (success) return success.environment_url || success.target_url
          }
        }
      }
    } catch {
      // Ignore network errors on deployment lookup
    }
    return null
  }
}

export const githubClient = new GitHubClient()
