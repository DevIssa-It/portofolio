/**
 * API Route: /api/github/sync
 * Manually trigger repository synchronization from GitHub.
 * Protected: Requires authenticated admin session.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { syncService } from '@/lib/services/sync.service'
import { ApiResponse, SyncResult } from '@/types/project'

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<SyncResult>>> {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin session required' },
        { status: 401 }
      )
    }

    let username: string | undefined
    try {
      const body = await request.json()
      username = body.username
    } catch {
      // Body is optional
    }

    const result = await syncService.syncRepositories(username)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to synchronize with GitHub'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
