import { sql, isDatabaseAvailable } from '@/lib/db'
import fs from 'fs'
import path from 'path'
import { ContactInquiry, CreateInquiryInput } from '@/types/inquiry'

const inquiriesFilePath = path.join(process.cwd(), 'data', 'inquiries.json')

function readJson(): ContactInquiry[] {
  try {
    return JSON.parse(fs.readFileSync(inquiriesFilePath, 'utf8'))
  } catch {
    return []
  }
}

function writeJson(data: ContactInquiry[]) {
  fs.writeFileSync(inquiriesFilePath, JSON.stringify(data, null, 2))
}

export class InquiryRepository {
  async findAll(): Promise<ContactInquiry[]> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      try {
        const records = await sql`SELECT * FROM "ContactInquiry" ORDER BY "createdAt" DESC`
        if (records.length > 0) return records as ContactInquiry[]
      } catch {
        // Fallback to JSON
      }
    }
    return readJson()
  }

  async create(data: CreateInquiryInput): Promise<ContactInquiry> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      try {
        const result = await sql`
          INSERT INTO "ContactInquiry" (
            id, name, email, company, "roleType", message, status, "createdAt"
          ) VALUES (
            gen_random_uuid()::text,
            ${data.name},
            ${data.email},
            ${data.company || ''},
            ${data.roleType || ''},
            ${data.message},
            'unread',
            NOW()
          ) RETURNING *
        `
        return result[0] as ContactInquiry
      } catch {
        // Fallback to JSON
      }
    }

    const list = readJson()
    const item: ContactInquiry = {
      id: Date.now().toString(),
      ...data,
      status: 'unread',
      createdAt: new Date().toISOString(),
    }
    list.unshift(item)
    writeJson(list)
    return item
  }

  async markAsRead(id: string): Promise<boolean> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      try {
        await sql`UPDATE "ContactInquiry" SET status = 'read' WHERE id = ${id}`
        return true
      } catch {
        // Fallback to JSON
      }
    }

    const list = readJson()
    const item = list.find((i) => i.id === id)
    if (item) {
      item.status = 'read'
      writeJson(list)
      return true
    }
    return false
  }

  async delete(id: string): Promise<boolean> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      try {
        await sql`DELETE FROM "ContactInquiry" WHERE id = ${id}`
        return true
      } catch {
        // Fallback to JSON
      }
    }

    const list = readJson()
    const filtered = list.filter((i) => i.id !== id)
    writeJson(filtered)
    return true
  }
}

export const inquiryRepository = new InquiryRepository()
