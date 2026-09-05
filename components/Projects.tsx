'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, FolderKanban } from 'lucide-react'
import { ProjectCard } from '@/components/micro/ProjectCard'
import { ProjectsFilterBar } from '@/components/micro/ProjectsFilterBar'
import { ProjectCaseStudyModal } from '@/components/micro/ProjectCaseStudyModal'
import { usePublicProjects } from '@/lib/hooks/usePublicProjects'
import { Project } from '@/types/project'

export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null)
  const {
    projects,
    totalFiltered,
    allTechnologies,
    loading,
    searchTerm,
    setSearchTerm,
    selectedTech,
    setSelectedTech,
    selectedCategory,
    setSelectedCategory,
    showAll,
    setShowAll,
    sortOrder,
    setSortOrder,
  } = usePublicProjects(6)

  return (
    <section id="projects" className="py-20 px-6 border-t-2 border-black bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="brutal-badge inline-block bg-emerald-300 text-black px-3 py-1 text-xs uppercase tracking-wider font-mono">
              {'// 02. Selected Works'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
              Web Applications & Repositories
            </h2>
            <p className="text-zinc-700 text-sm max-w-lg font-medium">
              Production projects, developer tooling, and open-source contributions.
            </p>
          </div>
          <span className="brutal-badge bg-white text-black px-3 py-1 text-xs font-mono">
            Showing {projects.length} of {totalFiltered} works
          </span>
        </div>

        {/* Filter & Search Bar */}
        <ProjectsFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOrder={sortOrder}
          onToggleSort={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
          selectedTech={selectedTech}
          onSelectTech={setSelectedTech}
          allTechnologies={allTechnologies}
        />

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="brutal-card h-72 animate-pulse bg-zinc-100" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 brutal-card bg-zinc-100 space-y-3">
            <FolderKanban size={36} className="mx-auto text-black" />
            <p className="text-black font-bold text-sm">No projects matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                tags={project.tags}
                liveUrl={project.demo}
                githubUrl={project.github}
                createdAt={project.createdAt}
                featured={project.featured}
                onViewCaseStudy={() => setActiveCaseStudy(project)}
              />
            ))}
          </div>
        )}

        {totalFiltered > 6 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="brutal-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-bold font-mono"
            >
              {showAll ? (
                <>Show Less <ChevronUp size={15} /></>
              ) : (
                <>Show All Projects ({totalFiltered}) <ChevronDown size={15} /></>
              )}
            </button>
          </div>
        )}
      </div>

      <ProjectCaseStudyModal
        project={activeCaseStudy}
        isOpen={!!activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  )
}
