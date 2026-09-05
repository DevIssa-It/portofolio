'use client'

import { Search, ArrowUpDown } from 'lucide-react'
import { ProjectCategory } from '@/types/project'

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Works' },
  { id: 'enterprise', label: 'Enterprise / ERP' },
  { id: 'web-app', label: 'Web Apps' },
  { id: 'api-tool', label: 'APIs & Tools' },
  { id: 'open-source', label: 'Open Source' },
]

interface ProjectsFilterBarProps {
  selectedCategory: ProjectCategory
  onSelectCategory: (cat: ProjectCategory) => void
  searchTerm: string
  onSearchChange: (val: string) => void
  sortOrder: 'newest' | 'oldest'
  onToggleSort: () => void
  selectedTech: string
  onSelectTech: (tech: string) => void
  allTechnologies: string[]
}

export function ProjectsFilterBar({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  sortOrder,
  onToggleSort,
  selectedTech,
  onSelectTech,
  allTechnologies,
}: ProjectsFilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Category Segmented Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b-2 border-black/10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            suppressHydrationWarning
            onClick={() => onSelectCategory(cat.id)}
            className={`brutal-btn px-3.5 py-1.5 rounded-md text-xs font-mono font-bold whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-black text-sky-300 border-2 border-black shadow-[2px_2px_0px_0px_#000]'
                : 'bg-white text-black hover:bg-sky-50 border-2 border-transparent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search, Sort, & Tech Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" size={16} />
            <input
              type="text"
              aria-label="Search projects by tech or keyword"
              placeholder="Search by tech or keyword..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-lg pl-10 pr-4 py-2 text-xs font-mono text-black placeholder:text-zinc-600 shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
            />
          </div>
          <button
            type="button"
            suppressHydrationWarning
            onClick={onToggleSort}
            className="brutal-btn inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-white text-black hover:bg-sky-100 whitespace-nowrap border-2 border-black shadow-[3px_3px_0px_0px_#000]"
            title="Urutkan repo: Terbaru / Terlama"
          >
            <ArrowUpDown size={14} />
            <span>{sortOrder === 'newest' ? 'Terbaru Dibuat' : 'Terlama Dibuat'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {allTechnologies.slice(0, 6).map((tech) => (
            <button
              key={tech}
              type="button"
              suppressHydrationWarning
              onClick={() => onSelectTech(tech)}
              className={`brutal-btn px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap ${
                selectedTech === tech
                  ? 'bg-black text-sky-300'
                  : 'bg-white text-black hover:bg-sky-100'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
