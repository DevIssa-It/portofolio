/**
 * Client-Side Interaction Analytics Tracker Hook
 * Dispatches non-blocking beacon/fetch events to /api/analytics/track
 */

import { useCallback } from 'react'
import { AnalyticsEventType } from '@/types/analytics'

export function useAnalyticsTracker() {
  const trackEvent = useCallback((type: AnalyticsEventType, target?: string) => {
    try {
      const payload = JSON.stringify({ type, target })
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/track', payload)
      } else {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {
          // Non-blocking, ignore errors
        })
      }
    } catch {
      // Non-blocking fail-safe
    }
  }, [])

  return { trackEvent }
}
