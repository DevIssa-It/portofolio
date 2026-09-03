'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Github, Link as LinkIcon } from 'lucide-react'

interface ProjectUrlFieldsProps {
  github: string
  demo: string
  onChange: (field: 'github' | 'demo', value: string) => void
}

export function ProjectUrlFields({
  github,
  demo,
  onChange,
}: ProjectUrlFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="github">GitHub URL</Label>
        <div className="relative">
          <Github
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <Input
            id="github"
            value={github}
            onChange={(e) => onChange('github', e.target.value)}
            placeholder="https://github.com/..."
            className="pl-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo">Demo URL</Label>
        <div className="relative">
          <LinkIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <Input
            id="demo"
            value={demo}
            onChange={(e) => onChange('demo', e.target.value)}
            placeholder="https://demo.com"
            className="pl-12"
          />
        </div>
      </div>
    </div>
  )
}
