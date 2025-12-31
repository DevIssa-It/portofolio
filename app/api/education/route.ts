import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const educationFilePath = path.join(process.cwd(), 'data', 'education.json')

// Helper function to read education
function getEducation() {
  const fileContents = fs.readFileSync(educationFilePath, 'utf8')
  return JSON.parse(fileContents)
}

// Helper function to write education
function saveEducation(education: any[]) {
  fs.writeFileSync(educationFilePath, JSON.stringify(education, null, 2))
}

// GET - Fetch all education
export async function GET() {
  try {
    const education = getEducation()
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
  }
}

// POST - Add new education (Protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const education = getEducation()
    
    const newEducation = {
      id: Date.now().toString(),
      ...body,
    }

    education.push(newEducation)
    saveEducation(education)

    return NextResponse.json(newEducation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 })
  }
}

// PUT - Update education (Protected)
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const education = getEducation()
    
    const index = education.findIndex((e: any) => e.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 })
    }

    education[index] = { ...education[index], ...updateData }
    saveEducation(education)

    return NextResponse.json(education[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 })
  }
}

// DELETE - Delete education (Protected)
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Education ID required' }, { status: 400 })
    }

    const education = getEducation()
    const filteredEducation = education.filter((e: any) => e.id !== id)

    if (education.length === filteredEducation.length) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 })
    }

    saveEducation(filteredEducation)
    return NextResponse.json({ message: 'Education deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 })
  }
}
