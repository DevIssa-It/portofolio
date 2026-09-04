'use client'

import { useState, useEffect } from 'react'
import { MapPin, Sun, Cloud, Clock } from 'lucide-react'

export function WeatherWidget() {
  const [time, setTime] = useState('')
  const [temp, setTemp] = useState<number | null>(null)

  useEffect(() => {
    // Clock in WIB
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

    // Free Open-Meteo API for Malang coordinates (-7.98, 112.63)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-7.98&longitude=112.63&current_weather=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.current_weather && data.current_weather.temperature !== undefined) {
          setTemp(Math.round(data.current_weather.temperature))
        }
      })
      .catch(() => {})

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="brutal-card bg-sky-100 p-5 flex flex-col justify-between h-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-black" />
          <span className="font-bold text-xs uppercase tracking-wider text-black">
            Malang, East Java
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-black shadow-[1px_1px_0px_0px_#000]">
          WIB (UTC+7)
        </span>
      </div>

      <div className="bg-white border-2 border-black p-3.5 rounded-lg shadow-[2px_2px_0px_0px_#000] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-700 font-mono">
            <Clock size={12} />
            <span>Local Time</span>
          </div>
          <span className="text-xl font-bold font-mono text-black">{time || '00:00:00'}</span>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 text-xs text-zinc-700 font-mono">
            <Sun size={13} className="text-amber-500" />
            <span>Weather</span>
          </div>
          <span className="text-xl font-bold font-mono text-black">
            {temp !== null ? `${temp} deg C` : '26 deg C'}
          </span>
        </div>
      </div>

      <div className="text-[11px] font-mono bg-emerald-200 border border-black p-2 rounded-md shadow-[1px_1px_0px_0px_#000] text-black">
        Status: Open for Software Engineering internships & remote roles.
      </div>
    </div>
  )
}
