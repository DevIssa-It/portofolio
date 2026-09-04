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
          className={`mb-6 p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-emerald-100 text-emerald-950'
              : 'bg-rose-100 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-3">
            {feedback.type === 'success' ? (
              <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-rose-700 shrink-0" />
            )}
            <span className="text-xs font-mono font-bold">{feedback.message}</span>
          </div>
          <button
            onClick={onDismiss}
            className="text-black hover:bg-black/10 rounded p-1 transition-colors"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
