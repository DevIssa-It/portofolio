'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ProjectCategory } from '@/types/project'

interface ProjectMetaFieldsProps {
  category?: ProjectCategory
  problemStatement?: string
  featured?: boolean
  onCategoryChange: (category: ProjectCategory) => void
  onProblemStatementChange: (value: string) => void
  onFeaturedChange: (featured: boolean) => void
}

const CATEGORY_OPTIONS: { value: ProjectCategory; label: string }[] = [
  { value: 'enterprise', label: 'Enterprise / ERP' },
  { value: 'web-app', label: 'Web Apps' },
  { value: 'api-tool', label: 'APIs & Tools' },
  { value: 'open-source', label: 'Open Source' },
]

export function ProjectMetaFields({
  category = 'web-app',
  problemStatement = '',
  featured = false,
  onCategoryChange,
  onProblemStatementChange,
  onFeaturedChange,
}: ProjectMetaFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">Project Category *</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as ProjectCategory)}
          className="w-full bg-white border-2 border-black rounded-lg px-3.5 py-2.5 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50 cursor-pointer"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="problemStatement">Architecture & Problem Statement</Label>
        <Textarea
          id="problemStatement"
          value={problemStatement}
          onChange={(e) => onProblemStatementChange(e.target.value)}
          placeholder="What core engineering challenge or business problem did this solve?"
          rows={2}
        />
      </div>

      <div className="flex items-center gap-2 p-3 bg-zinc-50 border border-black/20 rounded-lg">
        <input
          type="checkbox"
          id="featured"
          checked={!!featured}
          onChange={(e) => onFeaturedChange(e.target.checked)}
          className="w-4 h-4 accent-black rounded cursor-pointer"
        />
        <Label htmlFor="featured" className="cursor-pointer text-xs font-mono font-bold">
          Pin as Featured Project (Display at top with badge)
        </Label>
      </div>
    </div>
  )
}
