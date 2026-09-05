'use client'

import { useEffect } from 'react'
import { RotateCcw, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Portfolio segment error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 bg-[#f8fafc]">
      <div className="brutal-card bg-white border-2 border-black p-8 rounded-xl shadow-[4px_4px_0px_0px_#000] max-w-md w-full text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-100 border-2 border-black mx-auto flex items-center justify-center">
          <AlertTriangle size={24} className="text-rose-600" />
        </div>

        <div className="space-y-1">
          <span className="brutal-badge text-[10px] uppercase px-2 py-0.5 rounded bg-zinc-100 text-black font-mono font-bold">
            {'// Runtime Error'}
          </span>
          <h2 className="text-lg font-black font-mono uppercase text-black">
            Something Went Wrong
          </h2>
        </div>

        <p className="text-xs font-mono text-zinc-600 leading-relaxed">
          {error.message || 'An unexpected rendering issue occurred in this segment.'}
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="brutal-btn px-4 py-2 bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold rounded-lg inline-flex items-center gap-2 border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            <RotateCcw size={14} /> Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
