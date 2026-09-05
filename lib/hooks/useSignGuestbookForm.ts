'use client'

import { useState } from 'react'
import { CreateGuestbookInput } from '@/types/guestbook'

interface UseSignGuestbookFormParams {
  onSubmit: (data: CreateGuestbookInput) => Promise<boolean>
  onSuccess: () => void
}

export function useSignGuestbookForm({ onSubmit, onSuccess }: UseSignGuestbookFormParams) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [githubUsername, setGithubUsername] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const resetForm = () => {
    setName('')
    setRole('')
    setMessage('')
    setGithubUsername('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    const ok = await onSubmit({ name, role, message, githubUsername })
    if (ok) {
      resetForm()
      onSuccess()
    }
  }

  return {
    formState: { name, role, message, githubUsername, honeypot },
    setName,
    setRole,
    setMessage,
    setGithubUsername,
    setHoneypot,
    handleSubmit,
    isValid: Boolean(name.trim() && message.trim()),
  }
}
