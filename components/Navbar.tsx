'use client'

import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useScrollSpy } from '@/lib/hooks/useScrollSpy'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { id: 'hero', label: 'Overview' },
  { id: 'bento', label: 'Bento Hub' },
  { id: 'projects', label: 'Works' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useScrollSpy(NAV_ITEMS.map((n) => n.id))

  const handleScrollTo = (id: string) => {
    setMobileOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-4 inset-x-0 z-50 flex justify-center px-6 pointer-events-none">
      <nav className="pointer-events-auto brutal-card bg-white px-3 py-2 flex items-center gap-4 transition-all">
        {/* Brand */}
        <button
          onClick={() => handleScrollTo('hero')}
          className="flex items-center gap-2 pl-2 text-left"
        >
          <span className="w-3 h-3 rounded-full bg-sky-400 border border-black shadow-[1px_1px_0px_0px_#000]" />
          <span className="font-mono text-xs font-black tracking-wider text-black">
            A. ISSADURROFIQ
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 border-l-2 border-black pl-3">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={cn(
                  'px-3 py-1 text-xs font-bold font-mono rounded transition-colors',
                  isActive
                    ? 'bg-black text-sky-300'
                    : 'text-black hover:bg-sky-100'
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Action Button & Mobile Trigger */}
        <div className="flex items-center gap-2">
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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="pointer-events-auto md:hidden fixed top-20 inset-x-6 brutal-card bg-sky-50 p-4 space-y-2 z-50">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={cn(
                'w-full text-left p-2 text-xs font-bold font-mono rounded border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000]',
                activeId === item.id ? 'bg-black text-sky-300' : 'text-black'
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
