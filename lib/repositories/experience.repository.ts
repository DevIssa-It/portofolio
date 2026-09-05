import { sql, isDatabaseAvailable } from '@/lib/db'
import fs from 'fs'
import path from 'path'
import { sortChronologically } from '@/lib/utils/date-sorter'

export interface ExperienceEntity {
  id: string
  company: string
  position: string
  period: string
  description?: string
  technologies?: string[]
  createdAt?: string
  updatedAt?: string
}

const experienceFilePath = path.join(process.cwd(), 'data', 'experience.json')

function readJson(): ExperienceEntity[] {
  try {
    return JSON.parse(fs.readFileSync(experienceFilePath, 'utf8'))
  } catch {
    return []
  }
}

function writeJson(data: ExperienceEntity[]) {
  fs.writeFileSync(experienceFilePath, JSON.stringify(data, null, 2))
}

export class ExperienceRepository {
  async findAll(): Promise<ExperienceEntity[]> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      const records = await sql`SELECT * FROM "Experience" ORDER BY "createdAt" DESC`
      if (records.length > 0) return sortChronologically(records as ExperienceEntity[])
    }
    return sortChronologically(readJson())
  }

  async create(data: Omit<ExperienceEntity, 'id'>): Promise<ExperienceEntity> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      const result = await sql`
        INSERT INTO "Experience" (id, company, position, period, description, technologies, "createdAt", "updatedAt")
        VALUES (gen_random_uuid()::text, ${data.company}, ${data.position}, ${data.period}, ${data.description || ''}, ${data.technologies || []}, NOW(), NOW())
        RETURNING *
      `
      return result[0] as ExperienceEntity
    }
    const list = readJson()
    const item: ExperienceEntity = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    list.unshift(item)
    writeJson(list)
    return item
  }

  async update(id: string, data: Partial<ExperienceEntity>): Promise<ExperienceEntity | null> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      const result = await sql`
        UPDATE "Experience"
        SET company = COALESCE(${data.company}, company),
            position = COALESCE(${data.position}, position),
            period = COALESCE(${data.period}, period),
            description = COALESCE(${data.description}, description),
            technologies = COALESCE(${data.technologies}, technologies),
            "updatedAt" = NOW()
        WHERE id = ${id}
        RETURNING *
      `
      return (result[0] as ExperienceEntity) || null
    }
    const list = readJson()
    const index = list.findIndex((e) => e.id === id)
    if (index === -1) return null
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() }
    writeJson(list)
    return list[index]
  }

  async delete(id: string): Promise<boolean> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      await sql`DELETE FROM "Experience" WHERE id = ${id}`
      return true
    }
    const list = readJson()
    const filtered = list.filter((e) => e.id !== id)
    writeJson(filtered)
    return true
  }
}

export const experienceRepository = new ExperienceRepository()
