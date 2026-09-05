'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, FileText, Award } from 'lucide-react'
import { StatCard } from '@/components/admin/StatCard'

interface ProfileHeaderStatsProps {
  educationCount: number
  experienceCount: number
  certificationsCount: number
}

export function ProfileHeaderStats({
  educationCount,
  experienceCount,
  certificationsCount,
}: ProfileHeaderStatsProps) {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="pb-6 border-b-2 border-black">
        <span className="brutal-badge inline-block bg-sky-300 text-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase mb-2">
          {'// Credentials & Document Assets'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight">Profile & Resume Management</h1>
        <p className="text-xs font-mono text-zinc-600 mt-1">Manage verified education, industry experience, certifications, and live downloadable CV.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Education" value={educationCount} icon={GraduationCap} />
        <StatCard title="Experience" value={experienceCount} icon={Briefcase} />
        <StatCard title="Certificates" value={certificationsCount} icon={Award} />
        <StatCard title="CV Document" value="Live / PDF" icon={FileText} />
      </div>
    </div>
  )
}
