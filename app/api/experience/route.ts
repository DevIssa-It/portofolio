import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql, isDatabaseAvailable } from '@/lib/db'
import fs from 'fs'
import path from 'path'

const experienceFilePath = path.join(process.cwd(), 'data', 'experience.json')

// Helper function to read experience from JSON (fallback)
function getExperienceFromJSON() {
  const fileContents = fs.readFileSync(experienceFilePath, 'utf8')
  return JSON.parse(fileContents)
}

// Helper function to write experience to JSON (fallback)
function saveExperienceToJSON(experience: any[]) {
  fs.writeFileSync(experienceFilePath, JSON.stringify(experience, null, 2))
}

// GET - Fetch all experience
export async function GET() {
  try {
    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const experience = await sql`
        SELECT * FROM "Experience" 
        ORDER BY "createdAt" DESC
      `
      return NextResponse.json(experience)
    }
    
    // Fallback to JSON
    const experience = getExperienceFromJSON()
    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error fetching experience:', error)
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}

// POST - Create new experience (requires authentication)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { company, role, year, description = '' } = body

    if (!company || !role || !year) {
      return NextResponse.json({ error: 'Company, role, and year are required' }, { status: 400 })
    }

    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const result = await sql`
        INSERT INTO "Experience" (
          id, company, role, year, description, "createdAt", "updatedAt"
        )
        VALUES (
          gen_random_uuid()::text, 
          ${company}, 
          ${role}, 
          ${year}, 
          ${description}, 
          NOW(), 
          NOW()
        )
        RETURNING *
      `
      return NextResponse.json(result[0], { status: 201 })
    }

    // Fallback to JSON
    const experience = getExperienceFromJSON()
    const newExperience = {
      id: Date.now().toString(),
      company,
      role,
      year,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    experience.unshift(newExperience)
    saveExperienceToJSON(experience)
    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

// PUT - Update existing experience (requires authentication)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, company, role, year, description = '' } = body

    if (!id || !company || !role || !year) {
      return NextResponse.json({ error: 'ID, company, role, and year are required' }, { status: 400 })
    }

    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const result = await sql`
        UPDATE "Experience"
        SET 
          company = ${company}, 
          role = ${role}, 
          year = ${year}, 
          description = ${description}, 
          "updatedAt" = NOW()
        WHERE id = ${id}
        RETURNING *
      `
      if (result.length === 0) {
        return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
      }
      return NextResponse.json(result[0])
    }

    // Fallback to JSON
    const experience = getExperienceFromJSON()
    const experienceIndex = experience.findIndex((e: any) => e.id === id)
    if (experienceIndex === -1) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    experience[experienceIndex] = {
      ...experience[experienceIndex],
      company,
      role,
      year,
      description,
      updatedAt: new Date().toISOString(),
    }
    saveExperienceToJSON(experience)
    return NextResponse.json(experience[experienceIndex])
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

// DELETE - Delete an experience (requires authentication)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 })
    }

    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const result = await sql`
        DELETE FROM "Experience"
        WHERE id = ${id}
        RETURNING *
      `
      if (result.length === 0) {
        return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
      }
      return NextResponse.json({ message: 'Experience deleted successfully' })
    }

    // Fallback to JSON
    const experience = getExperienceFromJSON()
    const filteredExperience = experience.filter((e: any) => e.id !== id)
    if (experience.length === filteredExperience.length) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    saveExperienceToJSON(filteredExperience)
    return NextResponse.json({ message: 'Experience deleted successfully' })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
