'use client'

import { useState, useEffect } from 'react'
import { Mail, Briefcase, Calendar, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react'
import { ContactInquiry } from '@/types/inquiry'

export function InquiryManager() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)

  const loadInquiries = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/contact')
      if (res.ok) {
        const data = await res.json()
        setInquiries(data)
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInquiries()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold text-zinc-700">
          Total Inquiries: <span className="text-black font-black">{inquiries.length}</span>
        </span>
        <button
          type="button"
          onClick={loadInquiries}
          disabled={loading}
          className="brutal-btn flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-black text-xs font-mono font-bold cursor-pointer"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="p-8 brutal-card bg-white text-center font-mono text-xs text-zinc-500">
          Loading incoming inquiries...
        </div>
      ) : inquiries.length === 0 ? (
        <div className="p-10 brutal-card bg-white text-center space-y-2">
          <Mail size={32} className="mx-auto text-zinc-400" />
          <h3 className="font-mono font-bold text-sm text-black">No Inquiries Received Yet</h3>
          <p className="font-mono text-xs text-zinc-500">
            Messages dispatched through the contact form on your portfolio will be cataloged here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((item) => (
            <div
              key={item.id}
              className="brutal-card bg-white p-5 border-2 border-black rounded-lg space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/10 pb-3">
                <div>
                  <h4 className="font-mono font-black text-sm text-black">{item.name}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-600 mt-0.5">
                    <span className="text-black font-bold">{item.email}</span>
                    {item.company && (
                      <span className="flex items-center gap-1">
                        <Briefcase size={12} /> {item.company}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                      <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.roleType && (
                    <span className="brutal-badge text-[10px] font-mono px-2 py-0.5 rounded bg-sky-200 text-black font-bold">
                      {item.roleType}
                    </span>
                  )}
                  <a
                    href={`mailto:${item.email}?subject=Re:%20Portfolio%20Inquiry%20from%20Ahmad%20Issadurrofiq&body=Hi%20${encodeURIComponent(
                      item.name
                    )},%0D%0A%0D%0AThank%20you%20for%20reaching%20out.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn inline-flex items-center gap-1 px-3 py-1 bg-emerald-300 hover:bg-emerald-400 text-black text-xs font-mono font-bold rounded cursor-pointer"
                  >
                    Reply <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <p className="text-xs font-mono text-zinc-800 leading-relaxed whitespace-pre-wrap bg-zinc-50 p-3 rounded border border-black/20">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
