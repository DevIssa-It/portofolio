'use client'

import { Search, ChevronDown, ChevronUp, FolderKanban, ArrowUpDown } from 'lucide-react'
import { ProjectCard } from '@/components/micro/ProjectCard'
import { usePublicProjects } from '@/lib/hooks/usePublicProjects'

export default function Projects() {
  const {
    projects,
    totalFiltered,
    allTechnologies,
    loading,
    searchTerm,
    setSearchTerm,
    selectedTech,
    setSelectedTech,
    showAll,
    setShowAll,
    sortOrder,
    setSortOrder,
  } = usePublicProjects(6)

  return (
    <section id="projects" className="py-20 px-6 border-t-2 border-black bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="brutal-badge inline-block bg-emerald-300 text-black px-3 py-1 text-xs uppercase tracking-wider font-mono">
              // 02. Selected Works
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
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" size={16} />
              <input
                type="text"
                aria-label="Search projects by tech or keyword"
                placeholder="Search by tech or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-lg pl-10 pr-4 py-2 text-xs font-mono text-black placeholder:text-zinc-600 shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
              />
            </div>
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
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
                onClick={() => setSelectedTech(tech)}
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
    </section>
  )
}
