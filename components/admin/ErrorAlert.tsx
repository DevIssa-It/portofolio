'use client'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

interface ErrorAlertProps {
  message: string
  onClose?: () => void
}

export function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3"
    >
      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
      <div className="flex-1">
        <p className="text-sm text-red-500 font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-400 transition-colors text-xs font-bold"
        >
          ✕
        </button>
      )}
    </motion.div>
  )
}
