/**
 * API Route: /api/guestbook/[id]
 * Protected: Admin moderation (approve / reject / delete)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { guestbookRepository } from '@/lib/repositories/guestbook.repository'
import { GuestbookStatus } from '@/types/guestbook'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { status } = await request.json()
    if (status !== 'approved' && status !== 'pending') {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 })
    }

    await guestbookRepository.updateStatus(params.id, status as GuestbookStatus)
    return NextResponse.json({ success: true, message: `Status updated to ${status}` })
  } catch (error) {
    console.error('Error updating guestbook entry:', error)
    return NextResponse.json({ success: false, error: 'Failed to update entry' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await guestbookRepository.delete(params.id)
    return NextResponse.json({ success: true, message: 'Entry deleted successfully' })
  } catch (error) {
    console.error('Error deleting guestbook entry:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete entry' }, { status: 500 })
  }
}
