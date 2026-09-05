'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isSoundEnabled, setSoundEnabled, playToggleSound } from '@/lib/utils/sound'

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setEnabled(isSoundEnabled())
  }, [])

  const handleToggle = () => {
    const nextState = !enabled
    setEnabled(nextState)
    setSoundEnabled(nextState)
    playToggleSound(nextState)
  }

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Toggle mechanical sound FX"
        className="brutal-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono font-bold bg-white text-black opacity-60"
      >
        <VolumeX size={14} />
        <span className="hidden sm:inline">SOUND</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={enabled ? 'Mute mechanical sound effects' : 'Enable mechanical sound effects'}
      title={enabled ? 'Sound FX Enabled (Tactile Clicks)' : 'Sound FX Muted'}
      className={`brutal-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
        enabled ? 'bg-emerald-300 text-black border-black' : 'bg-white text-zinc-700'
      }`}
    >
      {enabled ? <Volume2 size={14} className="text-black" /> : <VolumeX size={14} />}
      <span className="hidden sm:inline">{enabled ? 'SFX: ON' : 'SFX: OFF'}</span>
    </button>
  )
}
