'use client'

import { useState } from 'react'
import { Send, CheckCircle, Github, Linkedin, Copy, Check } from 'lucide-react'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const email = 'ahmadissadurrofiq17@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    const fd = new FormData(e.currentTarget)
    const name = fd.get('name') as string
    const senderEmail = fd.get('email') as string
    const msg = fd.get('message') as string

    const mailto = `mailto:${email}?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(`Sender: ${name} (${senderEmail})\n\n${msg}`)}`
    window.open(mailto, '_blank')
    setStatus('success')
    e.currentTarget.reset()
  }

  return (
    <section id="contact" className="py-20 px-6 border-t-2 border-black bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-2 border-b-2 border-black/10 pb-4">
          <span className="brutal-badge inline-block bg-pink-300 text-black px-3 py-1 text-xs uppercase tracking-wider font-mono">
            {'// 04. Get In Touch'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
            Let's Build Something Great
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Copy Email */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm text-zinc-800 leading-relaxed font-medium">
              Currently looking for developer opportunities, internships, and collaborative web projects. Click to copy my email or send an inquiry directly.
            </p>

            {/* Click to Copy Card */}
            <div className="brutal-card bg-sky-100 p-5 space-y-2">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-black block">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-mono font-bold text-black truncate">{email}</span>
                <button
                  onClick={copyEmail}
                  className="brutal-btn p-2 rounded bg-white text-black shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-emerald-700" /> : <Copy size={16} />}
                </button>
              </div>
              {copied && <span className="text-[11px] font-mono text-emerald-800 font-bold block">Copied to clipboard!</span>}
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/DevIssa-It"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-white text-black text-xs"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/a-issadurrofiq-jaya-utama-6b559228a"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-white text-black text-xs"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="brutal-card bg-white p-6 sm:p-7 space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono font-bold uppercase text-black mb-1.5">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  className="w-full bg-zinc-50 border-2 border-black rounded-lg px-3.5 py-2.5 text-xs font-mono text-black placeholder:text-zinc-600 focus:bg-sky-50 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono font-bold uppercase text-black mb-1.5">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  className="w-full bg-zinc-50 border-2 border-black rounded-lg px-3.5 py-2.5 text-xs font-mono text-black placeholder:text-zinc-600 focus:bg-sky-50 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono font-bold uppercase text-black mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project scope or opportunity..."
                  className="w-full bg-zinc-50 border-2 border-black rounded-lg p-3 text-xs font-mono text-black placeholder:text-zinc-600 focus:bg-sky-50 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="brutal-btn w-full py-3 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-black uppercase flex items-center justify-center gap-2"
              >
                {status === 'success' ? (
                  <>Draft Opened in Mail App <CheckCircle size={15} /></>
                ) : (
                  <>Send Message <Send size={15} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
