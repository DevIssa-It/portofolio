'use client'

import { useState } from 'react'
import { Github, Linkedin, Copy, Check, Contact as ContactCardIcon } from 'lucide-react'
import { useAnalyticsTracker } from '@/lib/hooks/useAnalyticsTracker'
import { downloadVCard } from '@/lib/utils/vcard'
import ContactInquiryForm from '@/components/micro/ContactInquiryForm'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const { trackEvent } = useAnalyticsTracker()
  const email = 'ahmadissadurrofiq17@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    trackEvent('contact_copied')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVCardDownload = () => {
    trackEvent('vcard_downloaded', 'Ahmad_Issadurrofiq')
    downloadVCard()
  }

  return (
    <section id="contact" className="py-20 px-6 border-t-2 border-black bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="space-y-2 border-b-2 border-black/10 pb-4">
          <span className="brutal-badge inline-block bg-sky-300 text-black px-3 py-1 text-xs uppercase tracking-wider font-mono">
            {'// 04. Get In Touch'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
            Let's Build Something Great
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm text-zinc-800 leading-relaxed font-medium">
              Currently available for engineering roles, freelance contracts, and collaborative software projects. Submit an inquiry directly or save my contact card to your device.
            </p>

            <div className="brutal-card bg-sky-100 p-5 space-y-2">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-black block">Direct Email</span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-mono font-bold text-black truncate">{email}</span>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={copyEmail}
                  className="brutal-btn p-2 rounded bg-white text-black shrink-0 cursor-pointer"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-emerald-700" /> : <Copy size={16} />}
                </button>
              </div>
              {copied && <span className="text-[11px] font-mono text-emerald-800 font-bold block">Copied to clipboard!</span>}
            </div>

            <button
              type="button"
              onClick={handleVCardDownload}
              className="brutal-btn w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-300 hover:bg-emerald-400 text-black text-xs font-black uppercase font-mono cursor-pointer"
            >
              <ContactCardIcon size={16} /> Save Contact Card (.VCF)
            </button>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/DevIssa-It"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('github_click', 'DevIssa-It')}
                className="brutal-btn flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-white text-black text-xs font-mono font-bold"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/a-issadurrofiq-jaya-utama-6b559228a"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-white text-black text-xs font-mono font-bold"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactInquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}
