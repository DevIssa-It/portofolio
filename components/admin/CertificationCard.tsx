'use client'

import { Award, ExternalLink, Edit2, Trash2 } from 'lucide-react'
import { Certification } from '@/types/certification'

interface CertificationCardProps {
  certification: Certification
  onEdit: (cert: Certification) => void
  onDelete: (id: string) => void
}

export function CertificationCard({ certification, onEdit, onDelete }: CertificationCardProps) {
  return (
    <div className="brutal-card bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-xl p-5 space-y-3">
      <div className="flex justify-between items-start gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-black shrink-0" />
            <h4 className="text-base font-black text-black font-mono">{certification.title}</h4>
          </div>
          <p className="text-xs font-bold text-zinc-700 font-mono">{certification.issuer}</p>
        </div>

        <span className="brutal-badge bg-white text-black text-xs font-mono px-2.5 py-0.5 shrink-0 border border-black">
          {certification.issueDate}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-black/10">
        <div className="flex flex-wrap items-center gap-2">
          {certification.credentialId && (
            <span className="text-[11px] font-mono text-zinc-600 bg-zinc-50 px-2 py-0.5 rounded border border-black/20">
              ID: {certification.credentialId}
            </span>
          )}
          {certification.credentialUrl && (
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sky-700 hover:underline"
            >
              Verify <ExternalLink size={11} />
            </a>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(certification)}
            className="brutal-btn p-1.5 bg-white text-black hover:bg-sky-100 border border-black rounded"
            aria-label="Edit certification"
          >
            <Edit2 size={13} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(certification.id)}
            className="brutal-btn p-1.5 bg-red-100 hover:bg-red-200 text-red-900 border border-black rounded"
            aria-label="Delete certification"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
