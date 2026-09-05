'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnalyticsSummary } from '@/types/analytics'

export function useAnalyticsData() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/analytics/summary')
      const json = await res.json()
      if (json.success && json.data) {
        setSummary(json.data)
      } else {
        setError(json.error || 'Failed to load analytics')
      }
    } catch {
      setError('Network error fetching analytics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  return { summary, loading, error, refresh: fetchSummary }
}
