'use client'

import { X, Send, Loader2, Sparkles, Github } from 'lucide-react'
import { CreateGuestbookInput } from '@/types/guestbook'
import { useSignGuestbookForm } from '@/lib/hooks/useSignGuestbookForm'

interface SignGuestbookDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateGuestbookInput) => Promise<boolean>
  submitting: boolean
}

export function SignGuestbookDialog({
  open,
  onClose,
  onSubmit,
  submitting,
}: SignGuestbookDialogProps) {
  const {
    formState,
    setName,
    setRole,
    setMessage,
    setGithubUsername,
    setHoneypot,
    handleSubmit,
    isValid,
  } = useSignGuestbookForm({ onSubmit, onSuccess: onClose })

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-150">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative brutal-card bg-white border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-xl max-w-lg w-full p-6 space-y-5 z-10 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between pb-3 border-b-2 border-black">
          <div>
            <span className="brutal-badge bg-sky-200 text-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
              {'// Public Guestbook'}
            </span>
            <h3 className="text-lg font-black font-mono text-black uppercase tracking-tight flex items-center gap-2 mt-1">
              <Sparkles size={16} /> Leave an Endorsement
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 text-black border border-black"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formState.honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold text-black uppercase">Your Name *</label>
              <input
                type="text"
                required
                maxLength={50}
                value={formState.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3 py-2 text-xs font-mono border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold text-black uppercase">Role / Company</label>
              <input
                type="text"
                maxLength={80}
                value={formState.role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Software Engineer @ Tech Co"
                className="w-full px-3 py-2 text-xs font-mono border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-black uppercase flex items-center gap-1.5">
              <Github size={12} /> GitHub Username <span className="text-zinc-500 font-normal">(optional, for avatar)</span>
            </label>
            <input
              type="text"
              maxLength={40}
              value={formState.githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="e.g. torvalds"
              className="w-full px-3 py-2 text-xs font-mono border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-black uppercase">Endorsement Message *</label>
            <textarea
              required
              rows={3}
              minLength={5}
              maxLength={500}
              value={formState.message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your experience working or collaborating with Issa..."
              className="w-full px-3 py-2 text-xs font-mono border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-black/10">
            <button
              type="button"
              onClick={onClose}
              className="brutal-btn px-4 py-2 rounded-lg bg-white text-black text-xs font-mono font-bold border-2 border-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !isValid}
              className="brutal-btn px-5 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5 disabled:opacity-50"
            >
              {submitting ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
              <span>Submit for Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
