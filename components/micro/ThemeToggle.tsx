'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const active = document.documentElement.classList.contains('dark')
    setIsDark(active)
  }, [])

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    const nextDark = !isCurrentlyDark
    
    if (nextDark) {
      document.documentElement.classList.add('dark')
      try { localStorage.setItem('theme', 'dark') } catch {}
    } else {
      document.documentElement.classList.remove('dark')
      try { localStorage.setItem('theme', 'light') } catch {}
    }
    
    setIsDark(nextDark)
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle light/dark theme"
        className="brutal-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
      >
        <Moon size={13} />
        <span>DARK</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`brutal-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-bold border-2 transition-all ${
        isDark
          ? 'bg-[#0f141f] text-sky-300 border-sky-400 shadow-[2px_2px_0px_0px_#0284c7] hover:bg-[#162032]'
          : 'bg-white text-black border-black shadow-[2px_2px_0px_0px_#000] hover:bg-sky-50'
      }`}
      aria-label="Toggle light/dark theme"
    >
      {isDark ? <Sun size={13} className="text-sky-400" /> : <Moon size={13} />}
      <span>{isDark ? 'LIGHT' : 'DARK'}</span>
    </button>
  )
}
