'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useAnalyticsTracker } from '@/lib/hooks/useAnalyticsTracker'

export default function ContactInquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { trackEvent } = useAnalyticsTracker()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: (fd.get('name') as string)?.trim(),
      email: (fd.get('email') as string)?.trim(),
      company: (fd.get('company') as string)?.trim() || '',
      roleType: (fd.get('roleType') as string)?.trim() || '',
      message: (fd.get('message') as string)?.trim(),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to dispatch inquiry')
      }

      trackEvent('inquiry_submitted', payload.roleType || 'direct')
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error('Contact inquiry error:', err)
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="brutal-card bg-white p-6 sm:p-7 space-y-4">
      {status === 'success' && (
        <div className="p-4 rounded-lg bg-emerald-50 border-2 border-emerald-500 text-black space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-900">
            <CheckCircle size={16} className="text-emerald-700" />
            <span>Inquiry Received</span>
          </div>
          <p className="text-xs text-emerald-950 font-medium leading-relaxed">
            Thank you for reaching out. Your message has been safely logged and I will respond to your email shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-[11px] font-mono font-bold text-emerald-900 underline mt-1 block"
          >
            Send another inquiry
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="p-3.5 rounded-lg bg-rose-50 border-2 border-rose-500 text-black flex items-start gap-2 text-xs">
          <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-rose-900 font-mono">Transmission Error</span>
            <p className="text-rose-950 font-medium">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-mono font-bold uppercase text-black mb-1.5">
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={status === 'submitting'}
            placeholder="e.g. Alex Pratama"
            className="w-full bg-zinc-50 border-2 border-black rounded-lg px-3.5 py-2.5 text-xs font-mono text-black placeholder:text-zinc-500 focus:bg-sky-50 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-mono font-bold uppercase text-black mb-1.5">
            Your Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === 'submitting'}
            placeholder="alex@company.com"
            className="w-full bg-zinc-50 border-2 border-black rounded-lg px-3.5 py-2.5 text-xs font-mono text-black placeholder:text-zinc-500 focus:bg-sky-50 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-xs font-mono font-bold uppercase text-black mb-1.5">
            Company / Org (Optional)
          </label>
          <input
            id="company"
            name="company"
            type="text"
            disabled={status === 'submitting'}
            placeholder="Acme Labs / Studio"
            className="w-full bg-zinc-50 border-2 border-black rounded-lg px-3.5 py-2.5 text-xs font-mono text-black placeholder:text-zinc-500 focus:bg-sky-50 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="roleType" className="block text-xs font-mono font-bold uppercase text-black mb-1.5">
            Inquiry Purpose
          </label>
          <select
            id="roleType"
            name="roleType"
            disabled={status === 'submitting'}
            defaultValue="Project / Contract"
            className="w-full bg-zinc-50 border-2 border-black rounded-lg px-3.5 py-2.5 text-xs font-mono text-black focus:bg-sky-50 focus:outline-none cursor-pointer"
          >
            <option value="Full-time Role">Full-time Engineering Role</option>
            <option value="Project / Contract">Project / Contract Development</option>
            <option value="Internship">Internship Opportunity</option>
            <option value="Tech Collaboration">Open Source / Collaboration</option>
            <option value="Other">General Discussion</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-mono font-bold uppercase text-black mb-1.5">
          Project Details / Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          disabled={status === 'submitting'}
          placeholder="Describe your project requirements, scope, or job opportunity..."
          className="w-full bg-zinc-50 border-2 border-black rounded-lg p-3 text-xs font-mono text-black placeholder:text-zinc-500 focus:bg-sky-50 focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        suppressHydrationWarning
        className="brutal-btn w-full py-3 rounded-lg bg-sky-300 hover:bg-sky-400 disabled:bg-zinc-200 text-black text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer"
      >
        {status === 'submitting' ? (
          <>Transmitting Inquiry <Loader2 size={15} className="animate-spin" /></>
        ) : (
          <>Dispatch Inquiry <Send size={15} /></>
        )}
      </button>
    </form>
  )
}
