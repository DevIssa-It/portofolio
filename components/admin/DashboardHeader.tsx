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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-zinc-400">
            Welcome back, {adminEmail || 'Admin'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onSync}
            disabled={isSyncing}
            size="lg"
            className="gap-2 border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200"
          >
            <RefreshCw
              size={18}
              className={isSyncing ? 'animate-spin' : ''}
            />
            {isSyncing ? 'Syncing...' : 'Sync GitHub'}
          </Button>
          <Button onClick={onAdd} size="lg" className="gap-2">
            <Plus size={20} />
            Add Project
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
