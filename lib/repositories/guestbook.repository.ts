/**
 * Guestbook Repository
 * Neon Serverless PostgreSQL persistence with JSON fallback
 */

import fs from 'fs'
import path from 'path'
import { sql, isDatabaseAvailable } from '@/lib/db'
import { GuestbookEntry, CreateGuestbookInput, GuestbookStatus } from '@/types/guestbook'

const GUESTBOOK_FILE = path.join(process.cwd(), 'data', 'guestbook.json')

export class GuestbookRepository {
  private ensureTablePromise: Promise<void> | null = null

  private async ensureTable(): Promise<void> {
    if (!this.ensureTablePromise) {
      this.ensureTablePromise = (async () => {
        try {
          await sql`
            CREATE TABLE IF NOT EXISTS "GuestbookEntry" (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              role TEXT DEFAULT '',
              message TEXT NOT NULL,
              "avatarUrl" TEXT DEFAULT '',
              "githubUsername" TEXT DEFAULT '',
              status TEXT NOT NULL DEFAULT 'pending',
              "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
            )
          `
        } catch (err) {
          console.warn('Guestbook table check failed:', err)
        }
      })()
    }
    return this.ensureTablePromise
  }

  private readFallback(): GuestbookEntry[] {
    try {
      if (!fs.existsSync(GUESTBOOK_FILE)) return []
      const content = fs.readFileSync(GUESTBOOK_FILE, 'utf8')
      return JSON.parse(content)
    } catch {
      return []
    }
  }

  private writeFallback(entries: GuestbookEntry[]): void {
    try {
      const dir = path.dirname(GUESTBOOK_FILE)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(entries, null, 2))
    } catch {
      // Ignore in serverless
    }
  }

  async getAll(statusFilter?: GuestbookStatus): Promise<GuestbookEntry[]> {
    const dbReady = await isDatabaseAvailable()
    if (dbReady) {
      try {
        await this.ensureTable()
        const rows = statusFilter
          ? await sql`SELECT * FROM "GuestbookEntry" WHERE status = ${statusFilter} ORDER BY "createdAt" DESC`
          : await sql`SELECT * FROM "GuestbookEntry" ORDER BY "createdAt" DESC`
        return rows.map((r) => ({
          id: r.id,
          name: r.name,
          role: r.role || '',
          message: r.message,
          avatarUrl: r.avatarUrl || '',
          githubUsername: r.githubUsername || '',
          status: r.status as GuestbookStatus,
          createdAt: typeof r.createdAt === 'string' ? r.createdAt : r.createdAt.toISOString(),
        }))
      } catch (err) {
        console.warn('DB error fetching guestbook, using fallback:', err)
      }
    }
    const fallback = this.readFallback()
    return statusFilter ? fallback.filter((e) => e.status === statusFilter) : fallback
  }

  async create(input: CreateGuestbookInput): Promise<GuestbookEntry> {
    const id = 'gb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
    const github = input.githubUsername?.trim().replace(/^@/, '') || ''
    const avatarUrl = github ? `https://avatars.githubusercontent.com/${github}` : ''
    const createdAt = new Date().toISOString()
    const entry: GuestbookEntry = {
      id,
      name: input.name.trim(),
      role: input.role?.trim() || '',
      message: input.message.trim(),
      githubUsername: github,
      avatarUrl,
      status: 'pending',
      createdAt,
    }

    const dbReady = await isDatabaseAvailable()
    if (dbReady) {
      try {
        await this.ensureTable()
        await sql`
          INSERT INTO "GuestbookEntry" (id, name, role, message, "avatarUrl", "githubUsername", status, "createdAt")
          VALUES (${entry.id}, ${entry.name}, ${entry.role || ''}, ${entry.message}, ${entry.avatarUrl || ''}, ${entry.githubUsername || ''}, ${entry.status}, NOW())
        `
        return entry
      } catch (err) {
        console.warn('DB error creating guestbook entry, using fallback:', err)
      }
    }

    const fallback = this.readFallback()
    this.writeFallback([entry, ...fallback])
    return entry
  }

  async updateStatus(id: string, status: GuestbookStatus): Promise<boolean> {
    const dbReady = await isDatabaseAvailable()
    if (dbReady) {
      try {
        await this.ensureTable()
        await sql`UPDATE "GuestbookEntry" SET status = ${status} WHERE id = ${id}`
        return true
      } catch (err) {
        console.warn('DB error updating guestbook status:', err)
      }
    }
    const fallback = this.readFallback()
    const updated = fallback.map((e) => (e.id === id ? { ...e, status } : e))
    this.writeFallback(updated)
    return true
  }

  async delete(id: string): Promise<boolean> {
    const dbReady = await isDatabaseAvailable()
    if (dbReady) {
      try {
        await this.ensureTable()
        await sql`DELETE FROM "GuestbookEntry" WHERE id = ${id}`
        return true
      } catch (err) {
        console.warn('DB error deleting guestbook entry:', err)
      }
    }
    const fallback = this.readFallback()
    this.writeFallback(fallback.filter((e) => e.id !== id))
    return true
  }
}

export const guestbookRepository = new GuestbookRepository()
