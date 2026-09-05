/**
 * API Route: /api/analytics/summary
 * Protected: Retrieves aggregated analytics for the admin dashboard.
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { analyticsRepository } from '@/lib/repositories/analytics.repository'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const summary = await analyticsRepository.getSummary()
    return NextResponse.json({ success: true, data: summary })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
