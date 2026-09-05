'use client'

import { TerminalWidget } from '@/components/bento/TerminalWidget'
import { GitHubWidget } from '@/components/bento/GitHubWidget'
import { LofiPlayerWidget } from '@/components/bento/LofiPlayerWidget'
import { WeatherWidget } from '@/components/bento/WeatherWidget'
import { GithubContributionWidget } from '@/components/micro/GithubContributionWidget'
import { Code2 } from 'lucide-react'

export function BentoSection() {
  return (
    <section id="bento" className="py-20 px-6 border-t-2 border-black bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="brutal-badge inline-block bg-sky-300 text-black px-3 py-1 text-xs uppercase tracking-wider font-mono">
              Live Interactive Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              Developer Telemetry & Playground
            </h2>
            <p className="text-zinc-700 text-sm max-w-xl font-medium">
              Real-time API integrations, terminal console simulator, and live activity streams.
            </p>
          </div>
        </div>

        {/* Asymmetric Neo-Brutalist Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Terminal Widget (Spans 7 cols on lg) */}
          <div className="lg:col-span-7">
            <TerminalWidget />
          </div>

          {/* GitHub Live Stats Widget (Spans 5 cols on lg) */}
          <div className="lg:col-span-5">
            <GitHubWidget />
          </div>

          {/* Lofi Audio Player (Spans 4 cols on lg) */}
          <div className="lg:col-span-4">
            <LofiPlayerWidget />
          </div>

          {/* Weather & Clock Widget (Spans 4 cols on lg) */}
          <div className="lg:col-span-4">
            <WeatherWidget />
          </div>

          {/* Core Stack Card (Spans 4 cols on lg) */}
          <div className="lg:col-span-4 brutal-card bg-orange-100 p-5 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-black" />
                <span className="font-bold text-xs uppercase tracking-wider text-black">
                  Stack Radar
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-black shadow-[1px_1px_0px_0px_#000]">
                DAILY DRIVERS
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {['React.js', 'Next.js 14', 'Vue.js 3', 'TypeScript', 'Tailwind', 'Laravel', 'Node.js', 'Postgres'].map((s) => (
                <span
                  key={s}
                  className="bg-white border-2 border-black px-2 py-1 rounded shadow-[2px_2px_0px_0px_#000] text-black font-bold text-[11px]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="text-[11px] text-zinc-800 font-sans border-t border-black/10 pt-2 font-medium">
              Focus: Reactive interfaces, strict type safety, modular micro-components.
            </div>
          </div>

          {/* Live GitHub Contribution Matrix (Spans 12 cols on lg) */}
          <div className="lg:col-span-12">
            <GithubContributionWidget />
          </div>
        </div>
      </div>
    </section>
  )
}
