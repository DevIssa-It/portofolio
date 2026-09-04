import { useState, useEffect, useMemo } from 'react'
import { getProjects } from '@/lib/services/project.service'
import { Project } from '@/types/project'

export function usePublicProjects(initialDisplayCount = 4) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState('All')

  useEffect(() => {
    let isMounted = true
    async function fetchProjects() {
      setLoading(true)
      const res = await getProjects()
      if (isMounted) {
        if (res.success && res.data) {
          setProjects(res.data)
        }
        setLoading(false)
      }
    }
    fetchProjects()
    return () => {
      isMounted = false
    }
  }, [])

  const allTechnologies = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      p.technologies?.forEach((t) => set.add(t))
    })
    return ['All', ...Array.from(set)]
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchText =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchTech =
        selectedTech === 'All' || project.technologies?.includes(selectedTech)
      return matchText && matchTech
    })
  }, [projects, searchTerm, selectedTech])

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, initialDisplayCount)

  return {
    projects: displayedProjects,
    totalFiltered: filteredProjects.length,
    allTechnologies,
    loading,
    searchTerm,
    setSearchTerm,
    selectedTech,
    setSelectedTech,
    showAll,
    setShowAll,
  }
}
