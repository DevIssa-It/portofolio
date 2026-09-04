'use client'

import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="py-10 px-6 border-t-2 border-black bg-slate-100 text-xs text-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono font-bold">
        <div className="flex items-center gap-4">
          <div className="brutal-badge bg-white px-3 py-1 text-black">
            Malang, ID: {time || '00:00:00'} WIB
          </div>
          <div className="brutal-badge bg-emerald-300 px-3 py-1 text-black">
            Available for Hire
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/DevIssa-It"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn bg-white p-2 rounded"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/a-issadurrofiq-jaya-utama-6b559228a"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn bg-white p-2 rounded"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:ahmadissadurrofiq17@gmail.com"
            className="brutal-btn bg-white p-2 rounded"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        <div className="text-center md:text-right text-[11px] text-zinc-700">
          (C) {new Date().getFullYear()} A. Issadurrofiq Jaya Utama. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
