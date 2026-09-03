'use client'

import { motion } from 'framer-motion'
import { FolderGit2, TrendingUp, Eye } from 'lucide-react'
import { StatCard } from '@/components/admin/StatCard'

interface DashboardStatsProps {
  totalProjects: number
  totalTechnologies: number
  viewsCount?: string
}

export function DashboardStats({
  totalProjects,
  totalTechnologies,
  viewsCount = '2.4K',
}: DashboardStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
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
        title="Portfolio Views"
        value={viewsCount}
        icon={Eye}
        trend={{ value: 23, isPositive: true }}
      />
    </motion.div>
  )
}
