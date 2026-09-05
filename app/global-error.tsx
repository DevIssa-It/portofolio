'use client'

import { useEffect } from 'react'
import { RotateCcw, AlertOctagon } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Portfolio global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-black min-h-screen flex items-center justify-center p-6 font-mono">
        <div className="brutal-card bg-white border-2 border-black p-8 rounded-xl shadow-[6px_6px_0px_0px_#000] max-w-md w-full text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-100 border-2 border-black mx-auto flex items-center justify-center">
            <AlertOctagon size={28} className="text-rose-600" />
          </div>

          <div className="space-y-1">
            <span className="brutal-badge text-[10px] uppercase px-2 py-0.5 rounded bg-zinc-100 text-black font-mono font-bold">
              {'// System Exception'}
            </span>
            <h1 className="text-xl font-black uppercase text-black">
              Critical Error
            </h1>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed">
            {error.message || 'A root level rendering issue occurred. Please retry or refresh.'}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="brutal-btn px-5 py-2.5 bg-sky-300 hover:bg-sky-400 text-black text-xs font-bold rounded-lg inline-flex items-center gap-2 border-2 border-black shadow-[3px_3px_0px_0px_#000]"
            >
              <RotateCcw size={14} /> Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
