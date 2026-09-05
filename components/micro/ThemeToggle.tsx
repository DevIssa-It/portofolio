'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={toggleTheme}
      className="brutal-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-white text-black hover:bg-sky-50 border-2 border-black shadow-[2px_2px_0px_0px_#000] dark:bg-zinc-900 dark:text-sky-300 dark:border-sky-400 dark:shadow-[2px_2px_0px_0px_#38bdf8]"
      aria-label="Toggle light/dark theme"
    >
      {isDark ? <Sun size={13} className="text-sky-400" /> : <Moon size={13} />}
      <span>{isDark ? 'LIGHT' : 'DARK'}</span>
    </button>
  )
}
