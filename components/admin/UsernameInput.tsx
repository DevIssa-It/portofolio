'use client'
import * as React from 'react'
import { User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface UsernameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function UsernameInput({ label, error, className, ...props }: UsernameInputProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <Input
          type="text"
          className={cn('pl-12', className)}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
