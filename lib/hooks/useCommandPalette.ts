'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { ExternalLink, LucideIcon } from 'lucide-react'
import { Project } from '@/types/project'
import { useAnalyticsTracker } from '@/lib/hooks/useAnalyticsTracker'
import { getProjects } from '@/lib/services/project.service'
import { STATIC_PALETTE_ACTIONS, executePaletteAction } from '@/lib/constants/paletteNav'

export interface PaletteItem {
  id: string
  title: string
  subtitle?: string
  group: 'Navigation' | 'Actions' | 'Projects'
  icon: LucideIcon
  action: () => void
}

export function useCommandPalette(initialProjects: Project[] = []) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const hasFetched = useRef(false)
  const { trackEvent } = useAnalyticsTracker()

  useEffect(() => {
    if (initialProjects.length > 0) {
      setProjects(initialProjects)
      return
    }
    if (hasFetched.current) return
    hasFetched.current = true

    getProjects().then((r) => {
      if (r.success && r.data) setProjects(r.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProjects.length])

  const openPalette = useCallback(() => setIsOpen(true), [])
  const closePalette = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }, [])

  const items: PaletteItem[] = useMemo(() => {
    const staticList = STATIC_PALETTE_ACTIONS.map((a) => ({
      id: a.id,
      title: a.title,
      subtitle: a.subtitle,
      group: a.group,
      icon: a.icon,
      action: () => executePaletteAction(a, trackEvent, closePalette),
    }))

    const projectList = projects.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      subtitle: p.technologies?.slice(0, 3).join(', ') || 'Project',
      group: 'Projects' as const,
      icon: ExternalLink,
      action: () => {
        closePalette()
        if (p.demo && p.demo !== '#') {
          trackEvent('demo_click', p.title)
          window.open(p.demo, '_blank')
        } else if (p.github) {
          trackEvent('github_click', p.title)
          window.open(p.github, '_blank')
        }
      },
    }))
    return [...staticList, ...projectList]
  }, [projects, closePalette, trackEvent])

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter((i) => i.title.toLowerCase().includes(q) || i.subtitle?.toLowerCase().includes(q))
  }, [items, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((p) => !p)
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        closePalette()
      }
    }
    const onTrigger = () => setIsOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onTrigger)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onTrigger)
    }
  }, [isOpen, closePalette])

  useEffect(() => setSelectedIndex(0), [query])

  return { isOpen, query, setQuery, selectedIndex, setSelectedIndex, filteredItems, openPalette, closePalette }
}
