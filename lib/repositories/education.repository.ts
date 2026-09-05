import { sql, isDatabaseAvailable } from '@/lib/db'
import fs from 'fs'
import path from 'path'

export interface EducationEntity {
  id: string
  school: string
  degree: string
  year: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

const educationFilePath = path.join(process.cwd(), 'data', 'education.json')

function readJson(): EducationEntity[] {
  try {
    return JSON.parse(fs.readFileSync(educationFilePath, 'utf8'))
  } catch {
    return []
  }
}

function writeJson(data: EducationEntity[]) {
  fs.writeFileSync(educationFilePath, JSON.stringify(data, null, 2))
}

export class EducationRepository {
  async findAll(): Promise<EducationEntity[]> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      const records = await sql`SELECT * FROM "Education" ORDER BY "createdAt" DESC`
      if (records.length > 0) return records as EducationEntity[]
    }
    return readJson()
  }

  async create(data: Omit<EducationEntity, 'id'>): Promise<EducationEntity> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      const result = await sql`
        INSERT INTO "Education" (id, school, degree, year, description, "createdAt", "updatedAt")
        VALUES (gen_random_uuid()::text, ${data.school}, ${data.degree}, ${data.year}, ${data.description || ''}, NOW(), NOW())
        RETURNING *
      `
      return result[0] as EducationEntity
    }
    const list = readJson()
    const item: EducationEntity = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    list.unshift(item)
    writeJson(list)
    return item
  }

  async update(id: string, data: Partial<EducationEntity>): Promise<EducationEntity | null> {
    const isDbReady = await isDatabaseAvailable()
    if (isDbReady) {
      const result = await sql`
        UPDATE "Education"
        SET school = COALESCE(${data.school}, school),
            degree = COALESCE(${data.degree}, degree),
            year = COALESCE(${data.year}, year),
            description = COALESCE(${data.description}, description),
            "updatedAt" = NOW()
        WHERE id = ${id}
        RETURNING *
      `
      return (result[0] as EducationEntity) || null
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
      await sql`DELETE FROM "Education" WHERE id = ${id}`
      return true
    }
    const list = readJson()
    const filtered = list.filter((e) => e.id !== id)
    writeJson(filtered)
    return true
  }
}

export const educationRepository = new EducationRepository()
