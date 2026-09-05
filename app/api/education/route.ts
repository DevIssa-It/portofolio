import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { educationRepository } from '@/lib/repositories/education.repository'

// GET - Fetch all education
export async function GET() {
  try {
    const education = await educationRepository.findAll()
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

    const created = await educationRepository.create({ school, degree, year, description })
    return NextResponse.json(created, { status: 201 })
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

    const updated = await educationRepository.update(id, { school, degree, year, description })
    if (!updated) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating education:', error)
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 })
  }
}

// DELETE - Delete education (requires authentication)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Education ID is required' }, { status: 400 })
    }

    await educationRepository.delete(id)
    return NextResponse.json({ success: true, message: 'Education deleted successfully' })
  } catch (error) {
    console.error('Error deleting education:', error)
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 })
  }
}
