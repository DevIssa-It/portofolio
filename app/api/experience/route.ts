import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { experienceRepository } from '@/lib/repositories/experience.repository'

// GET - Fetch all experience
export async function GET() {
  try {
    const experience = await experienceRepository.findAll()
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
    const { company, position, period, description = '', technologies = [] } = body

    if (!company || !position || !period) {
      return NextResponse.json({ error: 'Company, position, and period are required' }, { status: 400 })
    }

    const created = await experienceRepository.create({ company, position, period, description, technologies })
    return NextResponse.json(created, { status: 201 })
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
    const { id, company, position, period, description = '', technologies = [] } = body

    if (!id || !company || !position || !period) {
      return NextResponse.json({ error: 'ID, company, position, and period are required' }, { status: 400 })
    }

    const updated = await experienceRepository.update(id, { company, position, period, description, technologies })
    if (!updated) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

// DELETE - Delete experience (requires authentication)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 })
    }

    await experienceRepository.delete(id)
    return NextResponse.json({ success: true, message: 'Experience deleted successfully' })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
