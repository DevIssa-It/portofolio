/**
 * Custom Hook: useAdminProjects
 * Encapsulates project data fetching, state management, CRUD, and synchronization.
 * Adheres to Single Responsibility Principle (SRP) and Separation of Concerns (SoC).
 */

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
      if (result.success && result.data) {
        setProjects(result.data)
      }
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects()
    }
  }, [isAuthenticated, loadProjects])

  const handleSyncGithub = async () => {
    setIsSyncing(true)
    setSyncFeedback(null)

    try {
      const result = await syncGithubProjects()
      if (result.success && result.data) {
        const { totalProcessed, createdCount, updatedCount, skippedCount } =
          result.data
        setSyncFeedback({
          type: 'success',
          message: `GitHub sync complete: ${createdCount} created, ${updatedCount} updated, ${skippedCount} unchanged (Total evaluated: ${totalProcessed}).`,
        })
        await loadProjects()
      } else {
        setSyncFeedback({
          type: 'error',
          message: result.error || 'GitHub repository synchronization failed.',
        })
      }
    } catch (error) {
      setSyncFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unexpected synchronization failure.',
      })
    } finally {
      setIsSyncing(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const result = await deleteProject(id)
      if (result.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleSave = async (project: Project) => {
    try {
      const result = editingProject
        ? await updateProject(project)
        : await createProject(project)

      if (result.success && result.data) {
        if (editingProject) {
          setProjects((prev) =>
            prev.map((p) => (p.id === result.data!.id ? result.data! : p))
          )
        } else {
          setProjects((prev) => [...prev, result.data!])
        }

        setShowForm(false)
        setEditingProject(null)
      }
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  const openAddForm = () => {
    setEditingProject(null)
    setShowForm(true)
  }

  const clearSyncFeedback = () => {
    setSyncFeedback(null)
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
    handleEdit,
    handleSave,
    closeForm,
    openAddForm,
    clearSyncFeedback,
  }
}
