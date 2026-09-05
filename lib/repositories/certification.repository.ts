import { sql, isDatabaseAvailable } from '@/lib/db'
import fs from 'fs'
import path from 'path'
import { Certification, CreateCertificationInput } from '@/types/certification'
import { sortChronologically } from '@/lib/utils/date-sorter'

const certificationsFilePath = path.join(process.cwd(), 'data', 'certifications.json')

function readJson(): Certification[] {
  try {
    return JSON.parse(fs.readFileSync(certificationsFilePath, 'utf8'))
  } catch {
    return []
  }
}

function writeJson(data: Certification[]) {
  fs.writeFileSync(certificationsFilePath, JSON.stringify(data, null, 2))
}

export class CertificationRepository {
  async findAll(): Promise<Certification[]> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      try {
        const records = await sql`SELECT * FROM "Certification" ORDER BY "createdAt" DESC`
        if (records.length > 0) return sortChronologically(records as Certification[])
      } catch {
        // Fallback to JSON if table not yet initialized
      }
    }
    return sortChronologically(readJson())
  }

  async create(data: CreateCertificationInput): Promise<Certification> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      try {
        const result = await sql`
          INSERT INTO "Certification" (
            id, title, issuer, "issueDate", "credentialId", "credentialUrl", "createdAt", "updatedAt"
          ) VALUES (
            gen_random_uuid()::text,
            ${data.title},
            ${data.issuer},
            ${data.issueDate},
            ${data.credentialId || ''},
            ${data.credentialUrl || ''},
            NOW(),
            NOW()
          ) RETURNING *
        `
        return result[0] as Certification
      } catch {
        // Fallback to JSON
      }
    }

    const list = readJson()
    const item: Certification = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    list.unshift(item)
    writeJson(list)
    return item
  }

  async update(id: string, data: Partial<CreateCertificationInput>): Promise<Certification | null> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      try {
        const result = await sql`
          UPDATE "Certification"
          SET title = COALESCE(${data.title}, title),
              issuer = COALESCE(${data.issuer}, issuer),
              "issueDate" = COALESCE(${data.issueDate}, "issueDate"),
              "credentialId" = COALESCE(${data.credentialId}, "credentialId"),
              "credentialUrl" = COALESCE(${data.credentialUrl}, "credentialUrl"),
              "updatedAt" = NOW()
          WHERE id = ${id}
          RETURNING *
        `
        if (result.length > 0) return result[0] as Certification
      } catch {
        // Fallback to JSON
      }
    }

    const list = readJson()
    const index = list.findIndex((c) => c.id === id)
    if (index === -1) return null
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() }
    writeJson(list)
    return list[index]
  }

  async delete(id: string): Promise<boolean> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      try {
        await sql`DELETE FROM "Certification" WHERE id = ${id}`
        return true
      } catch {
        // Fallback to JSON
      }
    }

    const list = readJson()
    const filtered = list.filter((c) => c.id !== id)
    writeJson(filtered)
    return true
  }
}

export const certificationRepository = new CertificationRepository()
