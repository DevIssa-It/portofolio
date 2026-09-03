'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'
import { SyncFeedbackState } from '@/lib/hooks/useAdminProjects'

interface SyncStatusBannerProps {
  feedback: SyncFeedbackState | null
  onDismiss: () => void
}

export function SyncStatusBanner({
  feedback,
  onDismiss,
}: SyncStatusBannerProps) {
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`mb-6 p-4 rounded-lg border flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
              : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {feedback.type === 'success' ? (
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle size={20} className="text-rose-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{feedback.message}</span>
          </div>
          <button
            onClick={onDismiss}
            className="text-zinc-400 hover:text-white p-1 transition-colors"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
