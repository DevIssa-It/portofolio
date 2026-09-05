'use client'

import { Plus, GraduationCap } from 'lucide-react'
import { Education } from '@/lib/services/education.service'
import { EducationCard } from '@/components/admin/EducationCard'

interface EducationSectionProps {
  education: Education[]
  onAdd: () => void
  onEdit: (edu: Education) => void
  onDelete: (id: string) => void
}

export function EducationSection({ education, onAdd, onEdit, onDelete }: EducationSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-black uppercase">Formal Education</h2>
        <button
          type="button"
          suppressHydrationWarning
          onClick={onAdd}
          className="brutal-btn flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
        >
          <Plus size={16} />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-16 brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-8">
          <GraduationCap size={40} className="mx-auto text-black mb-3" />
          <h3 className="text-lg font-black text-black uppercase mb-1">No education records yet</h3>
          <p className="text-zinc-600 text-xs font-mono mb-4">Add your degrees and institutions.</p>
          <button
            type="button"
            suppressHydrationWarning
            onClick={onAdd}
            className="brutal-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
          >
            <Plus size={16} />
            <span>Add Education</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <EducationCard
              key={edu.id}
              education={edu}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
