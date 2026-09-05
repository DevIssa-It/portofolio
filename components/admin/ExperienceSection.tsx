'use client'

import { Plus, Briefcase } from 'lucide-react'
import { Experience } from '@/lib/services/experience.service'
import { ExperienceCard } from '@/components/admin/ExperienceCard'

interface ExperienceSectionProps {
  experience: Experience[]
  onAdd: () => void
  onEdit: (exp: Experience) => void
  onDelete: (id: string) => void
}

export function ExperienceSection({ experience, onAdd, onEdit, onDelete }: ExperienceSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-black uppercase">Work Experience</h2>
        <button
          type="button"
          suppressHydrationWarning
          onClick={onAdd}
          className="brutal-btn flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
        >
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-16 brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-8">
          <Briefcase size={40} className="mx-auto text-black mb-3" />
          <h3 className="text-lg font-black text-black uppercase mb-1">No experience records yet</h3>
          <p className="text-zinc-600 text-xs font-mono mb-4">Add your professional work experience.</p>
          <button
            type="button"
            suppressHydrationWarning
            onClick={onAdd}
            className="brutal-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
          >
            <Plus size={16} />
            <span>Add Experience</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
