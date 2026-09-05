'use client'

import { Award, CheckCircle2, ExternalLink } from 'lucide-react'
import { Certification } from '@/types/certification'

interface CertificationsCardProps {
  certifications: Certification[]
}

export function CertificationsCard({ certifications }: CertificationsCardProps) {
  if (certifications.length === 0) return null

  return (
    <div className="brutal-card bg-orange-50 p-5 space-y-3">
      <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
        <Award size={15} /> Verified Certifications
      </h4>
      <div className="space-y-3 text-xs">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex items-start gap-2">
            <CheckCircle2 size={14} className="text-black shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-black">{cert.title}</span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-[10px] font-mono text-sky-700 hover:underline font-bold"
                  >
                    Verify <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <span className="text-[11px] font-mono text-zinc-600 block">
                {cert.issuer} • {cert.issueDate}
                {cert.credentialId ? ` • ID: ${cert.credentialId}` : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
