'use client'

import { Plus, Award } from 'lucide-react'
import { Certification } from '@/types/certification'
import { CertificationCard } from '@/components/admin/CertificationCard'

interface CertificationSectionProps {
  certifications: Certification[]
  onAdd: () => void
  onEdit: (cert: Certification) => void
  onDelete: (id: string) => void
}

export function CertificationSection({
  certifications,
  onAdd,
  onEdit,
  onDelete,
}: CertificationSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-black uppercase font-mono">Verified Certifications</h2>
        <button
          type="button"
          onClick={onAdd}
          className="brutal-btn flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
        >
          <Plus size={16} />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-16 brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-8">
          <Award size={40} className="mx-auto text-black mb-3" />
          <h3 className="text-lg font-black text-black uppercase mb-1 font-mono">No certifications yet</h3>
          <p className="text-zinc-600 text-xs font-mono mb-4">Add your industry certifications and credentials.</p>
          <button
            type="button"
            onClick={onAdd}
            className="brutal-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
          >
            <Plus size={16} />
            <span>Add Certification</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert) => (
            <CertificationCard
              key={cert.id}
              certification={cert}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
