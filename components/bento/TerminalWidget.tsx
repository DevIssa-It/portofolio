'use client'

import { useState } from 'react'
import { Send, Terminal as TerminalIcon } from 'lucide-react'

interface HistoryEntry {
  command: string
  output: string
}

export function TerminalWidget() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: 'whoami', output: 'A. Issadurrofiq - Software Engineer & IT Undergraduate @ Universitas Brawijaya' },
  ])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return

    let response = ''
    if (trimmed === 'help') {
      response = 'Available commands: whoami, skills, projects, experience, contact, clear'
    } else if (trimmed === 'whoami') {
      response = 'A. Issadurrofiq | IT Student @ Universitas Brawijaya | Frontend & Full-Stack Aspirant'
    } else if (trimmed === 'skills') {
      response = 'Frontend: React, Next.js 15, Vue, Tailwind CSS | Backend: Laravel, Node, Express | DB: MySQL, MongoDB, Firebase'
    } else if (trimmed === 'projects') {
      response = 'CampusHub Memory, TalentHunt Recruitment, CampusHub Event, Notes App'
    } else if (trimmed === 'experience') {
      response = 'CV Koding Data Artifisial (Next.js 15 ERP) & Core Initiative x Rakamin (Vue.js, 87.7/100)'
    } else if (trimmed === 'contact') {
      response = 'Email: ahmadissadurrofiq17@gmail.com | GitHub: @DevIssa-It'
    } else if (trimmed === 'clear') {
      setHistory([])
      setInput('')
      return
    } else {
      response = `Command not recognized: "${trimmed}". Type "help" for valid commands.`
    }

    setHistory((prev) => [...prev.slice(-3), { command: trimmed, output: response }])
    setInput('')
  }

  return (
    <div
      className="brutal-card p-5 flex flex-col justify-between h-full font-mono text-xs rounded-xl"
      style={{
        backgroundColor: '#090d16',
        color: '#f8fafc',
        border: '2px solid #000000',
        boxShadow: '4px 4px 0px 0px #000000',
      }}
    >
      {/* Terminal Title Bar */}
      <div
        className="flex items-center justify-between pb-3 mb-3 border-b"
        style={{ borderColor: '#27354f' }}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 border border-black inline-block" />
          <span className="w-3 h-3 rounded-full bg-sky-400 border border-black inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-400 border border-black inline-block" />
          <span
            className="text-xs font-bold ml-2 flex items-center gap-1.5"
            style={{ color: '#cbd5e1' }}
          >
            <TerminalIcon size={14} /> dev_terminal.sh
          </span>
        </div>
        <span
          className="text-[11px] font-mono px-2.5 py-0.5 rounded border font-semibold"
          style={{
            backgroundColor: '#172338',
            borderColor: '#334155',
            color: '#93c5fd',
          }}
        >
          type 'help'
        </span>
      </div>

      {/* Terminal Output History */}
      <div className="space-y-3 overflow-y-auto max-h-36 pr-1 font-mono">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <span style={{ color: '#4ade80' }}>$</span>
              <span style={{ color: '#38bdf8' }}>{h.command}</span>
            </div>
            <div
              className="text-xs pl-3.5 leading-relaxed font-medium"
              style={{ color: '#f8fafc' }}
            >
              {h.output}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Input Box */}
      <form onSubmit={handleCommand} className="mt-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg border-2"
          style={{
            backgroundColor: '#111827',
            borderColor: '#374151',
          }}
        >
          <span
            className="font-black text-sm select-none"
            style={{ color: '#4ade80' }}
          >
            $
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'skills', 'whoami', 'help'..."
            className="w-full bg-transparent border-none font-mono font-bold text-xs focus:outline-none"
            style={{
              color: '#4ade80',
              caretColor: '#4ade80',
            }}
            aria-label="Terminal command input"
          />
          <button
            type="submit"
            className="brutal-btn px-3 py-1 rounded text-xs flex items-center gap-1 font-bold shrink-0 text-black"
            style={{
              backgroundColor: '#38bdf8',
            }}
            aria-label="Execute command"
          >
            Run <Send size={11} />
          </button>
        </div>
      </form>
    </div>
  )
}
