/**
 * API Route: /api/analytics/track
 * Ingests portfolio interaction events (demo clicks, CV downloads, etc.)
 */

import { NextRequest, NextResponse } from 'next/server'
import { analyticsRepository } from '@/lib/repositories/analytics.repository'
import { AnalyticsEventType } from '@/types/analytics'

const VALID_TYPES: AnalyticsEventType[] = [
  'demo_click',
  'github_click',
  'cv_download',
  'contact_copied',
]

export async function POST(request: NextRequest) {
  try {
    let body: { type?: AnalyticsEventType; target?: string } = {}
    try {
      body = await request.json()
    } catch {
      // Beacon or empty payload fallback
    }

    const { type, target } = body

    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid event type' },
        { status: 400 }
      )
    }

    const event = await analyticsRepository.recordEvent(type, target)
    return NextResponse.json({ success: true, data: event })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
