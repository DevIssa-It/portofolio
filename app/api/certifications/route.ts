import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { certificationRepository } from '@/lib/repositories/certification.repository'

// GET - Fetch all certifications (public)
export async function GET() {
  try {
    const data = await certificationRepository.findAll()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 })
  }
}

// POST - Create certification (auth required)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, issuer, issueDate, credentialId = '', credentialUrl = '' } = body

    if (!title || !issuer || !issueDate) {
      return NextResponse.json({ error: 'Title, issuer, and issueDate are required' }, { status: 400 })
    }

    const created = await certificationRepository.create({ title, issuer, issueDate, credentialId, credentialUrl })
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating certification:', error)
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 })
  }
}

// PUT - Update certification (auth required)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, title, issuer, issueDate, credentialId = '', credentialUrl = '' } = body

    if (!id || !title || !issuer || !issueDate) {
      return NextResponse.json({ error: 'ID, title, issuer, and issueDate are required' }, { status: 400 })
    }

    const updated = await certificationRepository.update(id, { title, issuer, issueDate, credentialId, credentialUrl })
    if (!updated) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating certification:', error)
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 })
  }
}

// DELETE - Delete certification (auth required)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Certification ID is required' }, { status: 400 })
    }

    await certificationRepository.delete(id)
    return NextResponse.json({ success: true, message: 'Certification deleted successfully' })
  } catch (error) {
    console.error('Error deleting certification:', error)
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 })
  }
}
