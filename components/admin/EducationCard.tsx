'use client'
import { motion } from 'framer-motion'
import { GraduationCap, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Education {
  id: string
  school: string
  degree: string
  year: string
  description: string
}

interface EducationCardProps {
  education: Education
  onEdit: (education: Education) => void
  onDelete: (id: string) => void
}

export function EducationCard({ education, onEdit, onDelete }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-primary/50 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <GraduationCap size={24} className="text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{education.school}</h3>
            <p className="text-primary font-medium mb-2">{education.degree}</p>
            <p className="text-sm text-zinc-500 font-mono mb-3">{education.year}</p>
            {education.description && (
              <p className="text-zinc-400 text-sm leading-relaxed">{education.description}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(education)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Edit2 size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(education.id)}
            className="hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
