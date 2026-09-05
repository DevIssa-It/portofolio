'use client'

import { useState, useEffect, useRef } from 'react'

export interface ResumeMeta {
  exists: boolean
  filename: string
  path: string
  size: number
  updatedAt: string | null
}

export function useResumeManager() {
  const [meta, setMeta] = useState<ResumeMeta | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchMeta = async () => {
    try {
      setFetching(true)
      const res = await fetch(`/api/resume?t=${Date.now()}`, { cache: 'no-store' })
      if (res.ok) setMeta(await res.json())
    } catch {
      setMessage({ text: 'Failed to fetch resume status', type: 'error' })
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchMeta()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setMessage({ text: 'Only PDF files (.pdf) are allowed.', type: 'error' })
        return
      }
      setSelectedFile(file)
      setMessage(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setLoading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const res = await fetch('/api/resume', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setMessage({ text: 'CV successfully updated and live on portfolio!', type: 'success' })
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      await fetchMeta()
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to upload CV'
      setMessage({ text: errMsg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return {
    meta,
    selectedFile,
    loading,
    fetching,
    message,
    fileInputRef,
    fetchMeta,
    handleFileChange,
    handleUpload,
  }
}
