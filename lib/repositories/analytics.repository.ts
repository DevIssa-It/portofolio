/**
 * Analytics Repository
 * Records portfolio interaction events with dual storage resilience.
 * Adheres to Clean Architecture, SRP, and Repository Pattern.
 */

import fs from 'fs'
import path from 'path'
import { sql, isDatabaseAvailable } from '@/lib/db'
import {
  AnalyticsEvent,
  AnalyticsEventType,
  AnalyticsSummary,
} from '@/types/analytics'

const analyticsFilePath = path.join(process.cwd(), 'data', 'analytics.json')

export class AnalyticsRepository {
  private readJson(): AnalyticsEvent[] {
    try {
      if (!fs.existsSync(analyticsFilePath)) return []
      const file = fs.readFileSync(analyticsFilePath, 'utf8')
      return JSON.parse(file)
    } catch {
      return []
    }
  }

  private writeJson(events: AnalyticsEvent[]): void {
    try {
      const dir = path.dirname(analyticsFilePath)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(analyticsFilePath, JSON.stringify(events, null, 2))
    } catch (err) {
      console.error('Failed to write analytics json:', err)
    }
  }

  private async ensureSqlTable(): Promise<void> {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS "AnalyticsEvent" (
          id TEXT PRIMARY KEY,
          type TEXT NOT NULL,
          target TEXT,
          "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `
    } catch {
      // Table might already exist
    }
  }

  async recordEvent(type: AnalyticsEventType, target?: string): Promise<AnalyticsEvent> {
    const id = Date.now().toString() + '-' + Math.random().toString(36).substring(2, 6)
    const timestamp = new Date().toISOString()
    const event: AnalyticsEvent = { id, type, target, timestamp }

    const dbReady = await isDatabaseAvailable()
    if (dbReady) {
      try {
        await this.ensureSqlTable()
        await sql`
          INSERT INTO "AnalyticsEvent" (id, type, target, "timestamp")
          VALUES (${id}, ${type}, ${target || null}, ${timestamp})
        `
        return event
      } catch (error) {
        console.error('SQL analytics insert fallback to JSON:', error)
      }
    }

    const events = this.readJson()
    events.unshift(event)
    // Keep max 1000 events
    this.writeJson(events.slice(0, 1000))
    return event
  }

  async getSummary(): Promise<AnalyticsSummary> {
    const dbReady = await isDatabaseAvailable()
    if (dbReady) {
      try {
        await this.ensureSqlTable()
        const rows = await sql`
          SELECT type, COUNT(*)::int as count
          FROM "AnalyticsEvent"
          GROUP BY type
        `
        const recentRows = await sql`
          SELECT id, type, target, "timestamp"
          FROM "AnalyticsEvent"
          ORDER BY "timestamp" DESC
          LIMIT 10
        `

        let demoClicks = 0
        let githubClicks = 0
        let cvDownloads = 0
        let contactCopies = 0

        ;(rows as unknown as Array<{ type: string; count: number }>).forEach((r) => {
          if (r.type === 'demo_click') demoClicks = Number(r.count)
          if (r.type === 'github_click') githubClicks = Number(r.count)
          if (r.type === 'cv_download') cvDownloads = Number(r.count)
          if (r.type === 'contact_copied') contactCopies = Number(r.count)
        })

        return {
          totalDemoClicks: demoClicks,
          totalGithubClicks: githubClicks,
          totalCvDownloads: cvDownloads,
          totalContactCopies: contactCopies,
          totalEvents: demoClicks + githubClicks + cvDownloads + contactCopies,
          recentEvents: recentRows as AnalyticsEvent[],
        }
      } catch (error) {
        console.error('SQL analytics summary fallback to JSON:', error)
      }
    }

    const events = this.readJson()
    let demoClicks = 0
    let githubClicks = 0
    let cvDownloads = 0
    let contactCopies = 0

    events.forEach((e) => {
      if (e.type === 'demo_click') demoClicks++
      if (e.type === 'github_click') githubClicks++
      if (e.type === 'cv_download') cvDownloads++
      if (e.type === 'contact_copied') contactCopies++
    })

    return {
      totalDemoClicks: demoClicks,
      totalGithubClicks: githubClicks,
      totalCvDownloads: cvDownloads,
      totalContactCopies: contactCopies,
      totalEvents: events.length,
      recentEvents: events.slice(0, 10),
    }
  }
}

export const analyticsRepository = new AnalyticsRepository()
