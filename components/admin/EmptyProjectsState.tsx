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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-900 rounded-full mb-4">
        <FolderGit2 size={40} className="text-zinc-600" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
      <p className="text-zinc-400 mb-6">
        Get started by adding your first project or syncing from GitHub.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          onClick={onSync}
          disabled={isSyncing}
          size="lg"
          className="gap-2 border-zinc-800"
        >
          <RefreshCw
            size={18}
            className={isSyncing ? 'animate-spin' : ''}
          />
          Sync from GitHub
        </Button>
        <Button onClick={onAdd} size="lg">
          <Plus size={20} className="mr-2" />
          Add Manual Project
        </Button>
      </div>
    </motion.div>
  )
}
