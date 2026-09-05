import Link from 'next/link'
import { ArrowLeft, FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-mono">
      <div className="brutal-card bg-white border-2 border-black p-8 rounded-xl shadow-[6px_6px_0px_0px_#000] max-w-md w-full text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-sky-100 border-2 border-black mx-auto flex items-center justify-center">
          <FileQuestion size={28} className="text-sky-600" />
        </div>

        <div className="space-y-1">
          <span className="brutal-badge text-[10px] uppercase px-2 py-0.5 rounded bg-zinc-100 text-black font-bold">
            {'// 404 NOT FOUND'}
          </span>
          <h1 className="text-2xl font-black uppercase text-black">Page Not Found</h1>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed">
          The requested page or resource could not be found or has been relocated.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="brutal-btn px-5 py-2.5 bg-sky-300 hover:bg-sky-400 text-black text-xs font-bold rounded-lg inline-flex items-center gap-2 border-2 border-black shadow-[3px_3px_0px_0px_#000]"
          >
            <ArrowLeft size={14} /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
