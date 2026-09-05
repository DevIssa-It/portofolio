'use client'

import { Github, ExternalLink, GitCommit } from 'lucide-react'
import { useAnalyticsTracker } from '@/lib/hooks/useAnalyticsTracker'

export function GithubContributionWidget() {
  const { trackEvent } = useAnalyticsTracker()

  // 16 weeks of activity simulation with deterministic pseudo-random commits
  const weeks = Array.from({ length: 16 }, (_, w) => {
    return Array.from({ length: 7 }, (_, d) => {
      // Deterministic activity based on indices
      const seed = (w * 7 + d * 13) % 10
      return seed > 3 ? (seed > 7 ? 3 : seed > 5 ? 2 : 1) : 0
    })
  })

  const getCellColor = (level: number) => {
    switch (level) {
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

  return (
    <div className="brutal-card bg-white p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl space-y-4">
      {/* Widget Header */}
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

        <span className="brutal-badge text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200 text-black font-bold">
          Active Contributor
        </span>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-1.5 min-w-[280px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((level, dIdx) => (
                <div
                  key={dIdx}
                  title={`Level ${level} activity`}
                  className={`w-3 h-3 rounded-[2px] border border-black ${getCellColor(
                    level
                  )} shadow-[0.5px_0.5px_0px_0px_#000] hover:scale-125 transition-transform`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Widget Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-zinc-600">
        <div className="flex items-center gap-1.5">
          <GitCommit size={13} className="text-black" />
          <span>450+ commits this year</span>
        </div>

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
