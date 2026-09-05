'use client'

import { AlertTriangle, LogOut, Loader2, X } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'primary'
  loading?: boolean
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) return null

  const isDanger = variant === 'danger'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-150">
      <div
        className="fixed inset-0"
        onClick={() => !loading && onOpenChange(false)}
      />
      <div className="relative brutal-card bg-white border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-xl max-w-md w-full p-6 space-y-5 z-10 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-3 pb-3 border-b-2 border-black">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-lg border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] ${
                isDanger ? 'bg-red-200 text-red-950' : 'bg-sky-200 text-black'
              }`}
            >
              {isDanger ? <LogOut size={18} /> : <AlertTriangle size={18} />}
            </div>
            <div>
              <span className="brutal-badge bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                {'// Confirmation'}
              </span>
              <h3 className="text-base font-black font-mono text-black uppercase tracking-tight">
                {title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => !loading && onOpenChange(false)}
            className="p-1 rounded-md hover:bg-zinc-100 text-black border border-black"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs font-mono text-zinc-700 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="brutal-btn px-4 py-2 rounded-lg bg-white hover:bg-zinc-100 text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`brutal-btn px-4 py-2 rounded-lg text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 disabled:opacity-50 ${
              isDanger
                ? 'bg-red-400 hover:bg-red-500 text-black'
                : 'bg-sky-300 hover:bg-sky-400 text-black'
            }`}
          >
            {loading && <Loader2 size={13} className="animate-spin" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
