'use client'

import { useState, useEffect } from 'react'
import { Github, ExternalLink, GitCommit, Flame } from 'lucide-react'
import { useAnalyticsTracker } from '@/lib/hooks/useAnalyticsTracker'

interface DayContribution {
  date: string
  count: number
  level: number
}

interface ContributionData {
  totalCommits: number
  currentStreak: number
  weeks: DayContribution[][]
}

export function GithubContributionWidget() {
  const { trackEvent } = useAnalyticsTracker()
  const [data, setData] = useState<ContributionData | null>(null)
  const [hoveredDay, setHoveredDay] = useState<DayContribution | null>(null)

  useEffect(() => {
    fetch('/api/github/contributions')
      .then((res) => res.json())
      .then((json: ContributionData) => setData(json))
      .catch((err) => console.error('Failed to load contributions:', err))
  }, [])

  const getCellColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-emerald-600'
      case 3:
        return 'bg-emerald-500'
      case 2:
        return 'bg-emerald-400'
      case 1:
        return 'bg-emerald-300'
      default:
        return 'bg-zinc-100'
    }
  }

  // Fallback initial grid before client fetch
  const weeks = data?.weeks || Array.from({ length: 16 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => ({
      date: `2026-W${w}-D${d}`,
      count: (w + d) % 4,
      level: (w + d) % 4,
    }))
  )

  return (
    <div className="brutal-card bg-white p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-black/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center border border-black shadow-[1px_1px_0px_0px_#000]">
            <Github size={16} />
          </div>
          <div>
            <h4 className="text-xs font-mono font-black text-black leading-tight">
              DevIssa-It // GitHub Activity
            </h4>
            <p className="text-[10px] font-mono text-zinc-500">Public Open Source Contributions</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {data?.currentStreak ? (
            <span className="brutal-badge text-[10px] font-mono px-2 py-0.5 rounded bg-sky-200 text-black font-bold flex items-center gap-1">
              <Flame size={12} className="text-sky-700" /> {data.currentStreak}d Streak
            </span>
          ) : null}
          <span className="brutal-badge text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200 text-black font-bold">
            Live Heatmap
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-1.5 min-w-[280px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-3 h-3 rounded-[2px] border border-black ${getCellColor(
                    day.level
                  )} shadow-[0.5px_0.5px_0px_0px_#000] hover:scale-130 transition-transform cursor-pointer`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-zinc-600 min-h-[22px]">
        {hoveredDay ? (
          <div className="text-black font-bold">
            {hoveredDay.count} commit{hoveredDay.count === 1 ? '' : 's'} on {hoveredDay.date}
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <GitCommit size={13} className="text-black" />
            <span>{data?.totalCommits ? `${data.totalCommits}+ commits recorded` : '480+ commits recorded'}</span>
          </div>
        )}

        <a
          href="https://github.com/DevIssa-It"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('github_click', 'DevIssa-It')}
          className="inline-flex items-center gap-1 font-bold text-black hover:underline"
        >
          View Profile <ExternalLink size={12} />
        </a>
      </div>
    </div>
  )
}
