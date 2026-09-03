/**
 * API Route: /api/webhooks/github
 * Real-time event receiver for GitHub repository actions.
 * Verifies HMAC signatures and synchronizes projects automatically.
 */

import { NextRequest, NextResponse } from 'next/server'
import { APP_CONFIG } from '@/lib/config'
import { githubClient } from '@/lib/integrations/github.client'
import { syncService } from '@/lib/services/sync.service'
import { GitHubWebhookPayload } from '@/types/github'

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-hub-signature-256')
    const event = request.headers.get('x-github-event') || 'repository'

    // Verify webhook signature if secret is configured in environment
    if (APP_CONFIG.github.webhookSecret) {
      const isValid = githubClient.verifyWebhookSignature(
        rawBody,
        signature,
        APP_CONFIG.github.webhookSecret
      )

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 401 }
        )
      }
    }

    const payload: GitHubWebhookPayload = JSON.parse(rawBody)

    // Only process repository events
    if (event === 'repository' || payload.repository) {
      const result = await syncService.handleWebhookEvent(event, payload)
      return NextResponse.json({ success: true, result })
    }

    return NextResponse.json({
      success: true,
      message: `Event '${event}' acknowledged without action`,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error processing webhook'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
