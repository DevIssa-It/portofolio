'use client'

import { motion } from 'framer-motion'
import { FolderGit2, Plus, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyProjectsStateProps {
  isSyncing: boolean
  onSync: () => void
  onAdd: () => void
}

export function EmptyProjectsState({
  isSyncing,
  onSync,
  onAdd,
}: EmptyProjectsStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-8"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] mb-4">
        <FolderGit2 size={32} className="text-black" />
      </div>
      <h3 className="text-xl font-black text-black uppercase tracking-tight mb-1">No projects registered</h3>
      <p className="text-zinc-600 text-xs font-mono mb-6 max-w-sm mx-auto">
        Get started by importing your repositories directly from GitHub or adding a project manually.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
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
          <span>Sync from GitHub</span>
        </button>
        <button
          type="button"
          onClick={onAdd}
          className="brutal-btn flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
        >
          <Plus size={16} />
          <span>Add Manual Project</span>
        </button>
      </div>
    </motion.div>
  )
}
