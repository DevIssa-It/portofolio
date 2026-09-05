'use client'

import Image from 'next/image'
import { Check, Trash2 } from 'lucide-react'
import { GuestbookEntry } from '@/types/guestbook'

interface GuestbookEntryCardProps {
  entry: GuestbookEntry
  actionLoading: boolean
  onApprove: (id: string) => void
  onDeleteRequest: (id: string) => void
}

export function GuestbookEntryCard({
  entry,
  actionLoading,
  onApprove,
  onDeleteRequest,
}: GuestbookEntryCardProps) {
  return (
    <div className="brutal-card bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-xl p-4 space-y-3 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {entry.avatarUrl && (
              <Image
                src={entry.avatarUrl}
                alt={entry.name}
                width={28}
                height={28}
                className="rounded border border-black"
                unoptimized
              />
            )}
            <div>
              <h4 className="text-xs font-black font-mono text-black">{entry.name}</h4>
              <p className="text-[10px] font-mono text-zinc-500">{entry.role || 'Visitor'}</p>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border border-black ${
              entry.status === 'approved' ? 'bg-emerald-200 text-emerald-950' : 'bg-amber-100 text-amber-950'
            }`}
          >
            {entry.status}
          </span>
        </div>
        <p className="text-xs font-mono text-zinc-700 bg-zinc-50 p-2.5 rounded border border-black/10">
          &ldquo;{entry.message}&rdquo;
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-black/10">
        <span className="text-[10px] font-mono text-zinc-400">
          {new Date(entry.createdAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-2">
          {entry.status === 'pending' && (
            <button
              type="button"
              onClick={() => onApprove(entry.id)}
              disabled={actionLoading}
              className="brutal-btn px-3 py-1 bg-emerald-300 hover:bg-emerald-400 text-black text-xs font-mono font-bold border border-black rounded flex items-center gap-1"
            >
              <Check size={12} /> Approve
            </button>
          )}
          <button
            type="button"
            onClick={() => onDeleteRequest(entry.id)}
            className="brutal-btn p-1 bg-red-100 hover:bg-red-200 text-red-900 border border-black rounded"
            aria-label="Delete entry"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
