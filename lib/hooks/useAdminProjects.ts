'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  syncGithubProjects,
  Project,
} from '@/lib/services/project.service'

export interface SyncFeedbackState {
  type: 'success' | 'error'
  message: string
}

export function useAdminProjects(isAuthenticated: boolean) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [syncFeedback, setSyncFeedback] = useState<SyncFeedbackState | null>(null)

  const loadProjects = useCallback(async () => {
    try {
      const result = await getProjects()
      if (result.success && result.data) setProjects(result.data)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) loadProjects()
  }, [isAuthenticated, loadProjects])

  const handleSyncGithub = async () => {
    setIsSyncing(true)
    setSyncFeedback(null)
    try {
      const result = await syncGithubProjects()
      if (result.success && result.data) {
        const { totalProcessed, createdCount, updatedCount, skippedCount } = result.data
        setSyncFeedback({
          type: 'success',
          message: `GitHub sync complete: ${createdCount} created, ${updatedCount} updated, ${skippedCount} unchanged (Evaluated: ${totalProcessed}).`,
        })
        await loadProjects()
      } else {
        setSyncFeedback({ type: 'error', message: result.error || 'GitHub sync failed.' })
      }
    } catch (error) {
      setSyncFeedback({ type: 'error', message: error instanceof Error ? error.message : 'Sync failure.' })
    } finally {
      setIsSyncing(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    const result = await deleteProject(id)
    if (result.success) setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const handleSave = async (project: Project) => {
    const result = editingProject ? await updateProject(project) : await createProject(project)
    if (result.success && result.data) {
      setProjects((prev) =>
        editingProject ? prev.map((p) => (p.id === result.data!.id ? result.data! : p)) : [...prev, result.data!]
      )
      setShowForm(false)
      setEditingProject(null)
    }
  }

  return {
    projects,
    loading,
    isSyncing,
    showForm,
    editingProject,
    syncFeedback,
    handleSyncGithub,
    handleDelete,
    handleEdit: (p: Project) => { setEditingProject(p); setShowForm(true); },
    handleSave,
    closeForm: () => { setShowForm(false); setEditingProject(null); },
    openAddForm: () => { setEditingProject(null); setShowForm(true); },
    clearSyncFeedback: () => setSyncFeedback(null),
  }
}
