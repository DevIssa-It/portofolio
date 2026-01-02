import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql, isDatabaseAvailable } from '@/lib/db'
import fs from 'fs'
import path from 'path'

const educationFilePath = path.join(process.cwd(), 'data', 'education.json')

// Helper function to read education from JSON (fallback)
function getEducationFromJSON() {
  const fileContents = fs.readFileSync(educationFilePath, 'utf8')
  return JSON.parse(fileContents)
}

// Helper function to write education to JSON (fallback)
function saveEducationToJSON(education: any[]) {
  fs.writeFileSync(educationFilePath, JSON.stringify(education, null, 2))
}

// GET - Fetch all education
export async function GET() {
  try {
    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const education = await sql`
        SELECT * FROM "Education" 
        ORDER BY "createdAt" DESC
      `
      return NextResponse.json(education)
    }
    
    // Fallback to JSON
    const education = getEducationFromJSON()
    return NextResponse.json(education)
  } catch (error) {
    console.error('Error fetching education:', error)
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
  }
}

// POST - Create new education (requires authentication)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { school, degree, year, description = '' } = body

    if (!school || !degree || !year) {
      return NextResponse.json({ error: 'School, degree, and year are required' }, { status: 400 })
    }

    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const result = await sql`
        INSERT INTO "Education" (
          id, school, degree, year, description, "createdAt", "updatedAt"
        )
        VALUES (
          gen_random_uuid()::text, 
          ${school}, 
          ${degree}, 
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
    const education = getEducationFromJSON()
    const newEducation = {
      id: Date.now().toString(),
      school,
      degree,
      year,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    education.unshift(newEducation)
    saveEducationToJSON(education)
    return NextResponse.json(newEducation, { status: 201 })
  } catch (error) {
    console.error('Error creating education:', error)
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 })
  }
}

// PUT - Update existing education (requires authentication)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, school, degree, year, description = '' } = body

    if (!id || !school || !degree || !year) {
      return NextResponse.json({ error: 'ID, school, degree, and year are required' }, { status: 400 })
    }

    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const result = await sql`
        UPDATE "Education"
        SET 
          school = ${school}, 
          degree = ${degree}, 
          year = ${year}, 
          description = ${description}, 
          "updatedAt" = NOW()
        WHERE id = ${id}
        RETURNING *
      `
      if (result.length === 0) {
        return NextResponse.json({ error: 'Education not found' }, { status: 404 })
      }
      return NextResponse.json(result[0])
    }

    // Fallback to JSON
    const education = getEducationFromJSON()
    const educationIndex = education.findIndex((e: any) => e.id === id)
    if (educationIndex === -1) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 })
    }

    education[educationIndex] = {
      ...education[educationIndex],
      school,
      degree,
      year,
      description,
      updatedAt: new Date().toISOString(),
    }
    saveEducationToJSON(education)
    return NextResponse.json(education[educationIndex])
  } catch (error) {
    console.error('Error updating education:', error)
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 })
  }
}

// DELETE - Delete an education (requires authentication)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Education ID is required' }, { status: 400 })
    }

    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const result = await sql`
        DELETE FROM "Education"
        WHERE id = ${id}
        RETURNING *
      `
      if (result.length === 0) {
        return NextResponse.json({ error: 'Education not found' }, { status: 404 })
      }
      return NextResponse.json({ message: 'Education deleted successfully' })
    }

    // Fallback to JSON
    const education = getEducationFromJSON()
    const filteredEducation = education.filter((e: any) => e.id !== id)
    if (education.length === filteredEducation.length) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 })
    }
    saveEducationToJSON(filteredEducation)
    return NextResponse.json({ message: 'Education deleted successfully' })
  } catch (error) {
    console.error('Error deleting education:', error)
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 })
  }
}
