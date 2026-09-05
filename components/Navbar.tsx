'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, Command } from 'lucide-react'
import { useScrollSpy } from '@/lib/hooks/useScrollSpy'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { id: 'hero', label: 'Overview' },
  { id: 'bento', label: 'Bento Hub' },
  { id: 'projects', label: 'Works' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = NAV_ITEMS.map((n) => n.id)

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollActiveId = useScrollSpy(SECTION_IDS)
  const [activeTab, setActiveTab] = useState<string>('hero')

  useEffect(() => {
    if (scrollActiveId) setActiveTab(scrollActiveId)
  }, [scrollActiveId])

  const handleScrollTo = (id: string) => {
    setMobileOpen(false)
    setActiveTab(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const triggerCommandPalette = () => {
    setMobileOpen(false)
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <header className="sticky top-4 inset-x-0 z-50 flex justify-center px-6 pointer-events-none">
      <nav className="pointer-events-auto brutal-card bg-white px-3 py-2 flex items-center gap-4 transition-all">
        <button
          onClick={() => handleScrollTo('hero')}
          className="flex items-center gap-2 pl-2 text-left"
        >
          <span className="w-3 h-3 rounded-full bg-sky-400 border border-black shadow-[1px_1px_0px_0px_#000]" />
          <span className="font-mono text-xs font-black tracking-wider text-black">
            A. ISSADURROFIQ
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1 border-l-2 border-black pl-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={cn(
                'px-3 py-1 text-xs font-bold font-mono rounded transition-colors',
                activeTab === item.id ? 'bg-black text-sky-300' : 'text-black hover:bg-sky-100'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerCommandPalette}
            aria-label="Open Command Palette"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold bg-zinc-100 hover:bg-zinc-200 text-black border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Command size={12} />
            <span>Cmd+K</span>
          </button>

          <button
            onClick={() => handleScrollTo('contact')}
            className="hidden sm:inline-flex items-center gap-1 brutal-btn bg-sky-300 hover:bg-sky-400 text-black px-3.5 py-1 text-xs rounded-md"
          >
            Hire Me <ArrowUpRight size={13} />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 text-black md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="pointer-events-auto md:hidden fixed top-20 inset-x-6 brutal-card bg-sky-50 p-4 space-y-2 z-50">
          <button
            type="button"
            onClick={triggerCommandPalette}
            className="w-full text-left p-2 text-xs font-bold font-mono rounded border-2 border-black bg-zinc-100 text-black flex items-center justify-between shadow-[2px_2px_0px_0px_#000]"
          >
            <span className="flex items-center gap-2"><Command size={14} /> Quick Search</span>
            <span className="text-[10px] bg-white px-1.5 py-0.5 border border-black rounded">Ctrl+K</span>
          </button>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={cn(
                'w-full text-left p-2 text-xs font-bold font-mono rounded border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000]',
                activeTab === item.id ? 'bg-black text-sky-300' : 'text-black'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
