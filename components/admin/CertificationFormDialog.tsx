'use client'

import { useState, useEffect } from 'react'
import { X, Award, Save } from 'lucide-react'
import { Certification, CreateCertificationInput } from '@/types/certification'

interface CertificationFormDialogProps {
  open: boolean
  onClose: () => void
  onSave: (data: CreateCertificationInput & { id?: string }) => Promise<void>
  initialData?: Certification | null
}

export function CertificationFormDialog({
  open,
  onClose,
  onSave,
  initialData,
}: CertificationFormDialogProps) {
  const [title, setTitle] = useState('')
  const [issuer, setIssuer] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [credentialId, setCredentialId] = useState('')
  const [credentialUrl, setCredentialUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setIssuer(initialData.issuer)
      setIssueDate(initialData.issueDate)
      setCredentialId(initialData.credentialId || '')
      setCredentialUrl(initialData.credentialUrl || '')
    } else {
      setTitle('')
      setIssuer('')
      setIssueDate('')
      setCredentialId('')
      setCredentialUrl('')
    }
  }, [initialData, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSave({
        id: initialData?.id,
        title,
        issuer,
        issueDate,
        credentialId,
        credentialUrl,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative brutal-card bg-white border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-xl max-w-lg w-full p-6 space-y-4 z-10">
        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
          <h3 className="text-base font-black font-mono text-black uppercase flex items-center gap-2">
            <Award size={18} /> {initialData ? 'Edit Certification' : 'Add Certification'}
          </h3>
          <button type="button" onClick={onClose} className="p-1 border border-black rounded hover:bg-zinc-100">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
          <div className="space-y-1">
            <label className="font-bold text-black uppercase">Certificate Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Agile Scrum Fundamentals (ASF)"
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:bg-sky-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-black uppercase">Issuing Organization *</label>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. MindMagine / Coursera"
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:bg-sky-50"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-black uppercase">Issue Date / Year *</label>
              <input
                type="text"
                required
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                placeholder="e.g. May 2025"
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:bg-sky-50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-black uppercase">Credential ID (optional)</label>
            <input
              type="text"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              placeholder="e.g. 351201IAPAGIC2492025"
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:bg-sky-50"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-black uppercase">Credential Verification URL (optional)</label>
            <input
              type="url"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
              placeholder="https://coursera.org/verify/..."
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:bg-sky-50"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-black/10">
            <button type="button" onClick={onClose} className="brutal-btn px-4 py-2 border-2 border-black rounded bg-white">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="brutal-btn px-5 py-2 border-2 border-black rounded bg-sky-300 hover:bg-sky-400 font-bold flex items-center gap-1.5"
            >
              <Save size={14} /> {submitting ? 'Saving...' : 'Save Certificate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
