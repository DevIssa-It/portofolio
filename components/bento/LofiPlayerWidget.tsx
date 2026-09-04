'use client'

import { useState } from 'react'
import { Play, Pause, Disc3, Volume2 } from 'lucide-react'

export function LofiPlayerWidget() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="brutal-card bg-purple-100 p-5 flex flex-col justify-between h-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Disc3 className={`text-black ${isPlaying ? 'animate-spin' : ''}`} size={20} />
          <span className="font-bold text-xs uppercase tracking-wider text-black">
            Lofi Focus Player
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-black shadow-[1px_1px_0px_0px_#000]">
          {isPlaying ? 'PLAYING' : 'PAUSED'}
        </span>
      </div>

      <div className="bg-white border-2 border-black p-3 rounded-lg shadow-[2px_2px_0px_0px_#000] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-black truncate">Midnight Coding • Chillhop</span>
          <Volume2 size={15} className="text-zinc-500 shrink-0" />
        </div>

        {/* Soundwave Visualizer Bars */}
        <div className="flex items-end gap-1 h-7 pt-1">
          {[40, 70, 30, 85, 60, 95, 50, 80, 45, 90, 65, 35].map((height, i) => (
            <span
              key={i}
              className={`flex-1 bg-black rounded-xs transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'opacity-30'
              }`}
              style={{ height: isPlaying ? `${height}%` : '20%' }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="brutal-btn flex-1 bg-sky-300 hover:bg-sky-400 text-black py-2 px-4 rounded-md text-xs flex items-center justify-center gap-2"
        >
          {isPlaying ? (
            <>
              <Pause size={14} /> Pause Audio
            </>
          ) : (
            <>
              <Play size={14} /> Play Focus Beats
            </>
          )}
        </button>
      </div>
    </div>
  )
}
