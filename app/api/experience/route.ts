import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const experienceFilePath = path.join(process.cwd(), 'data', 'experience.json')

// Helper function to read experience
function getExperience() {
  const fileContents = fs.readFileSync(experienceFilePath, 'utf8')
  return JSON.parse(fileContents)
}

// Helper function to write experience
function saveExperience(experience: any[]) {
  fs.writeFileSync(experienceFilePath, JSON.stringify(experience, null, 2))
}

// GET - Fetch all experience
export async function GET() {
  try {
    const experience = getExperience()
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}

// POST - Add new experience (Protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const experience = getExperience()
    
    const newExperience = {
      id: Date.now().toString(),
      ...body,
    }

    experience.push(newExperience)
    saveExperience(experience)

    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

// PUT - Update experience (Protected)
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const experience = getExperience()
    
    const index = experience.findIndex((e: any) => e.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    experience[index] = { ...experience[index], ...updateData }
    saveExperience(experience)

    return NextResponse.json(experience[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

// DELETE - Delete experience (Protected)
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Experience ID required' }, { status: 400 })
    }

    const experience = getExperience()
    const filteredExperience = experience.filter((e: any) => e.id !== id)

    if (experience.length === filteredExperience.length) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    saveExperience(filteredExperience)
    return NextResponse.json({ message: 'Experience deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
