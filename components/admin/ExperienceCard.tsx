'use client'
import { motion } from 'framer-motion'
import { Briefcase, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Experience {
  id: string
  company: string
  role: string
  year: string
  description: string
}

interface ExperienceCardProps {
  experience: Experience
  onEdit: (experience: Experience) => void
  onDelete: (id: string) => void
}

export function ExperienceCard({ experience, onEdit, onDelete }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="group brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-6 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1">
          <div className="flex-shrink-0 w-12 h-12 bg-sky-100 border-2 border-black rounded-lg flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
            <Briefcase size={22} />
          </div>
          
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-black text-black uppercase">{experience.company}</h3>
              <span className="text-[11px] font-mono font-bold text-black bg-emerald-200 px-2 py-0.5 rounded border border-black">
                {experience.role}
              </span>
            </div>
            <p className="text-xs text-zinc-600 font-mono font-bold">{experience.year}</p>
            {experience.description && (
              <p className="text-zinc-700 text-xs leading-relaxed font-medium pt-1 whitespace-pre-line">
                {experience.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(experience)}
            className="brutal-btn p-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-black border-2 border-black"
            aria-label="Edit experience"
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(experience.id)}
            className="brutal-btn p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-900 border-2 border-black"
            aria-label="Delete experience"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
