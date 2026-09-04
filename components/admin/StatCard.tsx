'use client'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="brutal-card bg-white p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl flex items-center justify-between"
    >
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase font-bold text-zinc-600 tracking-wider">
          {title}
        </p>
        <p className="text-3xl font-black font-mono text-black">
          {value}
        </p>
        {trend && (
          <span
            className={`inline-block mt-1 px-2 py-0.5 rounded border border-black text-[10px] font-mono font-bold shadow-[1px_1px_0px_0px_#000] ${
              trend.isPositive
                ? 'bg-emerald-200 text-emerald-950'
                : 'bg-red-200 text-red-950'
            }`}
          >
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% monthly
          </span>
        )}
      </div>

      <div className="w-12 h-12 rounded-lg bg-sky-200 border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
        <Icon size={22} />
      </div>
    </motion.div>
  )
}
