'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Section } from '@/components/micro/Section'
import { ProjectCard } from '@/components/micro/ProjectCard'
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  tags: string[]
  github: string
  demo: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState('All')

  const INITIAL_DISPLAY = 4

  useEffect(() => {
    // Fetch from API route instead of static file
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading projects:', error)
        setLoading(false)
      })
  }, [])

  // Get all unique technologies
  const allTechnologies = ['All', ...Array.from(new Set(projects.flatMap(p => p.technologies)))]

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech)
    return matchesSearch && matchesTech
  })

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_DISPLAY)

  return (
    <Section id="projects" className="border-t border-zinc-900">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Projects</h2>
        <span className="font-mono text-primary text-sm">Real Work Experience</span>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="appearance-none bg-zinc-900 border border-zinc-800 rounded-lg pl-4 pr-10 py-3 text-white focus:border-primary focus:outline-none transition-colors cursor-pointer min-w-[200px]"
          >
            {allTechnologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={18} />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  tags={project.tags}
                  liveUrl={project.demo}
                  githubUrl={project.github}
                />
              </motion.div>
            ))}
          </div>

          {filteredProjects.length > INITIAL_DISPLAY && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-primary/50 text-white rounded-full transition-all group"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                  </>
                ) : (
                  <>
                    Show All Projects ({filteredProjects.length}) <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </Section>
  )
}
