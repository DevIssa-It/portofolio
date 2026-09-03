'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

interface TechnologyTagInputProps {
  technologies: string[]
  onChange: (technologies: string[]) => void
}

export function TechnologyTagInput({
  technologies,
  onChange,
}: TechnologyTagInputProps) {
  const [techInput, setTechInput] = React.useState('')

  const addTechnology = () => {
    const trimmed = techInput.trim()
    if (trimmed && !technologies.includes(trimmed)) {
      onChange([...technologies, trimmed])
      setTechInput('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    onChange(technologies.filter((tech) => tech !== techToRemove))
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="tech">Technologies</Label>
      <div className="flex gap-2">
        <Input
          id="tech"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTechnology()
            }
          }}
          placeholder="React, Node.js, Next.js, etc."
        />
        <Button type="button" onClick={addTechnology} variant="secondary">
          Add
        </Button>
      </div>

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-semibold"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="hover:text-primary/70 p-0.5 rounded transition-colors"
                aria-label={`Remove ${tech}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
