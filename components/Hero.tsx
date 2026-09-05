'use client'

import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react'
import { useAnalyticsTracker } from '@/lib/hooks/useAnalyticsTracker'

export default function Hero() {
  const { trackEvent } = useAnalyticsTracker()

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="pt-16 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-center gap-3">
          <span className="brutal-badge bg-emerald-300 text-black px-3 py-1 text-xs font-mono font-black uppercase">
            Available for Developer Roles & Internships
          </span>
          <span className="font-mono text-xs font-bold text-zinc-600 hidden sm:inline">
            {'// Malang, East Java (ID)'}
          </span>
        </div>

        <div className="max-w-5xl space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-black leading-[1.06] uppercase">
            Crafting High-Performance Web Apps & Modern Interfaces.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-700 max-w-3xl leading-relaxed font-medium">
            I am <span className="bg-sky-200 px-1.5 py-0.5 border-2 border-black font-bold text-black inline-block shadow-[2px_2px_0px_0px_#000]">A. Issadurrofiq Jaya Utama</span>, an Information Technology student at Universitas Brawijaya. Focused on modern web development with React.js, Next.js, and Tailwind CSS, backed by server-side capabilities in Laravel, Node.js, and MySQL.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => scrollTo('projects')}
            className="brutal-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-sm"
          >
            Explore Projects <ArrowDown size={16} />
          </button>
          <a
            href="/resume.pdf"
            download
            onClick={() => trackEvent('cv_download')}
            className="brutal-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm"
          >
            <Download size={16} /> Download Resume
          </a>

          <div className="flex items-center gap-2 pl-2">
            <a
              href="https://github.com/DevIssa-It"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('github_click', 'DevIssa-It')}
              className="brutal-btn p-2.5 rounded-lg bg-white text-black"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/a-issadurrofiq-jaya-utama-6b559228a"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn p-2.5 rounded-lg bg-white text-black"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:ahmadissadurrofiq17@gmail.com"
              onClick={() => trackEvent('contact_copied')}
              className="brutal-btn p-2.5 rounded-lg bg-white text-black"
              aria-label="Send Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="brutal-card bg-sky-100 p-5 space-y-2">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-black block">
              Core Stack
            </span>
            <p className="text-sm font-bold text-black">React.js, Next.js 15, Tailwind CSS, TypeScript</p>
            <p className="text-xs text-zinc-700">Modular UI architectures, shadcn/ui, Jest & RTL unit testing.</p>
          </div>

          <div className="brutal-card bg-orange-100 p-5 space-y-2">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-black block">
              Enterprise Track
            </span>
            <p className="text-sm font-bold text-black">CV Koding Data Artifisial</p>
            <p className="text-xs text-zinc-700">6-month Frontend Intern; modular ERP dashboards, role-based auth & MSW.</p>
          </div>

          <div className="brutal-card bg-emerald-100 p-5 space-y-2">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-black block">
              Academic Base
            </span>
            <p className="text-sm font-bold text-black">Universitas Brawijaya</p>
            <p className="text-xs text-zinc-700">Bachelor of Computer Science; Software Engineering concentration.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
