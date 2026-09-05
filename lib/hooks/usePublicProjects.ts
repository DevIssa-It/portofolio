import { useState, useEffect, useMemo } from 'react'
import { getProjects } from '@/lib/services/project.service'
import { Project, ProjectCategory } from '@/types/project'

export function usePublicProjects(initialDisplayCount = 6) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

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
    const list = projects.filter((project) => {
      const matchText =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchTech =
        selectedTech === 'All' || project.technologies?.includes(selectedTech)
      const matchCategory =
        selectedCategory === 'all' || project.category === selectedCategory
      return matchText && matchTech && matchCategory
    })

    return list.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB
    })
  }, [projects, searchTerm, selectedTech, selectedCategory, sortOrder])

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, initialDisplayCount)

  return {
    projects: displayedProjects,
    rawProjects: projects,
    totalFiltered: filteredProjects.length,
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
  }
}
