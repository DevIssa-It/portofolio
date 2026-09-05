'use client'

import { useState, useEffect, useCallback } from 'react'
import { GuestbookEntry, CreateGuestbookInput } from '@/types/guestbook'

export function useGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/guestbook')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setEntries(json.data)
      }
    } catch (err) {
      console.error('Failed to load guestbook:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const submitEntry = async (input: CreateGuestbookInput): Promise<boolean> => {
    setSubmitting(true)
    setFeedback(null)
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setFeedback({ type: 'error', text: json.error || 'Failed to submit endorsement.' })
        return false
      }
      setFeedback({ type: 'success', text: 'Thank you! Your endorsement was received and is pending admin moderation.' })
      return true
    } catch {
      setFeedback({ type: 'error', text: 'Network error. Please try again.' })
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return {
    entries,
    loading,
    submitting,
    feedback,
    fetchEntries,
    submitEntry,
    clearFeedback: () => setFeedback(null),
  }
}
