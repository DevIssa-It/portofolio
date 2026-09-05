'use client'

import { useState, useEffect, useCallback } from 'react'
import { Check, Clock } from 'lucide-react'
import { GuestbookEntry } from '@/types/guestbook'
import { GuestbookEntryCard } from '@/components/admin/GuestbookEntryCard'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'

export function GuestbookManager() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending')
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/guestbook')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) setEntries(json.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchEntries() }, [fetchEntries])

  const handleApprove = async (id: string) => {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/guestbook/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      })
      if (res.ok) setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, status: 'approved' } : e)))
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!itemToDelete) return
    setActionLoading(true)
    try {
      const res = await fetch(`/api/guestbook/${itemToDelete}`, { method: 'DELETE' })
      if (res.ok) setEntries((prev) => prev.filter((e) => e.id !== itemToDelete))
      setItemToDelete(null)
    } finally {
      setActionLoading(false)
    }
  }

  const filtered = entries.filter((e) => e.status === activeTab)
  const pendingCount = entries.filter((e) => e.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`brutal-btn px-4 py-2 rounded-lg text-xs font-mono font-bold border-2 border-black flex items-center gap-2 ${
              activeTab === 'pending' ? 'bg-black text-sky-300 shadow-[2px_2px_0px_0px_#000]' : 'bg-white text-black'
            }`}
          >
            <Clock size={14} />
            <span>Pending Review</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 bg-red-400 text-black rounded text-[10px] font-black">{pendingCount}</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('approved')}
            className={`brutal-btn px-4 py-2 rounded-lg text-xs font-mono font-bold border-2 border-black flex items-center gap-2 ${
              activeTab === 'approved' ? 'bg-black text-sky-300 shadow-[2px_2px_0px_0px_#000]' : 'bg-white text-black'
            }`}
          >
            <Check size={14} />
            <span>Approved & Live</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center border-2 border-dashed border-black rounded-xl bg-white font-mono text-xs">
          Loading entries...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-black rounded-xl bg-white font-mono text-xs text-zinc-500">
          No {activeTab} endorsement entries found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((entry) => (
            <GuestbookEntryCard
              key={entry.id}
              entry={entry}
              actionLoading={actionLoading}
              onApprove={handleApprove}
              onDeleteRequest={setItemToDelete}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        title="Delete Endorsement"
        description="Are you sure you want to delete this guestbook endorsement? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={actionLoading}
        onConfirm={handleDelete}
      />
    </div>
  )
}
