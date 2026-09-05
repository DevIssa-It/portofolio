/**
 * API Route: /api/guestbook
 * Handles public retrieval of approved endorsements and new submissions
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { guestbookRepository } from '@/lib/repositories/guestbook.repository'
import { GuestbookStatus } from '@/types/guestbook'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('status') as GuestbookStatus | null

    // Non-admin visitors can only view approved endorsements
    const statusFilter = session ? (filter || undefined) : 'approved'
    const entries = await guestbookRepository.getAll(statusFilter)

    return NextResponse.json({ success: true, data: entries })
  } catch (error) {
    console.error('Error fetching guestbook:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch guestbook' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, role, message, githubUsername, honeypot } = body

    // Honeypot bot protection
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message received' })
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
      return NextResponse.json({ success: false, error: 'Name must be between 2 and 50 characters' }, { status: 400 })
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 500) {
      return NextResponse.json({ success: false, error: 'Message must be between 5 and 500 characters' }, { status: 400 })
    }

    const entry = await guestbookRepository.create({
      name: name.trim(),
      role: role ? String(role).trim().slice(0, 80) : '',
      message: message.trim(),
      githubUsername: githubUsername ? String(githubUsername).trim().slice(0, 40) : '',
    })

    return NextResponse.json({
      success: true,
      data: entry,
      message: 'Thank you! Your endorsement has been submitted for moderation.',
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating guestbook entry:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit entry' }, { status: 500 })
  }
}
