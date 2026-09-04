'use client'

import { motion } from 'framer-motion'
import { Plus, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DashboardHeaderProps {
  adminEmail?: string | null
  isSyncing: boolean
  onSync: () => void
  onAdd: () => void
}

export function DashboardHeader({
  adminEmail,
  isSyncing,
  onSync,
  onAdd,
}: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 pb-6 border-b-2 border-black"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="brutal-badge inline-block bg-sky-300 text-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase mb-2">
            {'// Control Center'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs font-mono text-zinc-600 mt-1">
            Authenticated session: <span className="font-bold text-black">{adminEmail || 'Admin'}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSync}
            disabled={isSyncing}
            className="brutal-btn flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-sky-50 text-black text-xs font-mono font-bold border-2 border-black disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={isSyncing ? 'animate-spin' : ''}
            />
            <span>{isSyncing ? 'Syncing...' : 'Sync GitHub'}</span>
          </button>

          <button
            type="button"
            onClick={onAdd}
            className="brutal-btn flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
          >
            <Plus size={16} />
            <span>Add Project</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
