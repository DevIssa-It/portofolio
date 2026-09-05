'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FolderGit2, TrendingUp, MousePointerClick, Download, ExternalLink } from 'lucide-react'
import { StatCard } from '@/components/admin/StatCard'
import { AnalyticsSummary } from '@/types/analytics'

interface DashboardStatsProps {
  totalProjects: number
  totalTechnologies: number
}

export function DashboardStats({
  totalProjects,
  totalTechnologies,
}: DashboardStatsProps) {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)

  useEffect(() => {
    fetch('/api/analytics/summary')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && data.data) {
          setSummary(data.data)
        }
      })
      .catch(() => {})
  }, [])

  const demoClicks = summary?.totalDemoClicks || 0
  const githubClicks = summary?.totalGithubClicks || 0
  const cvDownloads = summary?.totalCvDownloads || 0
  const totalInteractions = summary?.totalEvents || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-4 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Projects"
          value={totalProjects}
          icon={FolderGit2}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Technologies"
          value={totalTechnologies}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Live User Interactions"
          value={totalInteractions}
          icon={MousePointerClick}
          trend={{ value: totalInteractions > 0 ? totalInteractions : 0, isPositive: true }}
        />
      </div>

      <div className="brutal-card bg-white p-3 border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <span className="font-bold text-black uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse" />
          Event Telemetry:
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 bg-sky-50 px-2.5 py-1 border border-black rounded shadow-[1px_1px_0px_0px_#000]">
            <ExternalLink size={12} className="text-sky-600" />
            <span className="text-zinc-600">Demo Clicks:</span>
            <strong className="text-black">{demoClicks}</strong>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 border border-black rounded shadow-[1px_1px_0px_0px_#000]">
            <Download size={12} className="text-emerald-600" />
            <span className="text-zinc-600">CV Downloads:</span>
            <strong className="text-black">{cvDownloads}</strong>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-50 px-2.5 py-1 border border-black rounded shadow-[1px_1px_0px_0px_#000]">
            <ExternalLink size={12} className="text-black" />
            <span className="text-zinc-600">GitHub Clicks:</span>
            <strong className="text-black">{githubClicks}</strong>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
