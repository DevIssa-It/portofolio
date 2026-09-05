'use client'

import { useState, useEffect } from 'react'
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  Education,
} from '@/lib/services/education.service'
import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  Experience,
} from '@/lib/services/experience.service'

export function useProfileData(isAuthenticated: boolean) {
  const [education, setEducation] = useState<Education[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showEducationForm, setShowEducationForm] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [showExperienceForm, setShowExperienceForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'education' | 'experience' } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadData = async () => {
    try {
      const [eduResult, expResult] = await Promise.all([getEducation(), getExperience()])
      if (eduResult.success && eduResult.data) setEducation(eduResult.data)
      if (expResult.success && expResult.data) setExperience(expResult.data)
    } catch (error) {
      console.error('Error loading profile data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) loadData()
  }, [isAuthenticated])

  const confirmDelete = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)
    try {
      if (itemToDelete.type === 'education') {
        const result = await deleteEducation(itemToDelete.id)
        if (result.success) setEducation((prev) => prev.filter((e) => e.id !== itemToDelete.id))
      } else {
        const result = await deleteExperience(itemToDelete.id)
        if (result.success) setExperience((prev) => prev.filter((e) => e.id !== itemToDelete.id))
      }
      setItemToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSaveEducation = async (edu: Education) => {
    const result = editingEducation ? await updateEducation(edu) : await createEducation(edu)
    if (result.success && result.data) {
      setEducation((prev) =>
        editingEducation ? prev.map((e) => (e.id === result.data!.id ? result.data! : e)) : [...prev, result.data!]
      )
      setShowEducationForm(false)
      setEditingEducation(null)
    }
  }

  const handleSaveExperience = async (exp: Experience) => {
    const result = editingExperience ? await updateExperience(exp) : await createExperience(exp)
    if (result.success && result.data) {
      setExperience((prev) =>
        editingExperience ? prev.map((e) => (e.id === result.data!.id ? result.data! : e)) : [...prev, result.data!]
      )
      setShowExperienceForm(false)
      setEditingExperience(null)
    }
  }

  return {
    education,
    experience,
    loading,
    showEducationForm,
    editingEducation,
    setShowEducationForm,
    setEditingEducation,
    itemToDelete,
    isDeleting,
    handleDeleteEducation: (id: string) => setItemToDelete({ id, type: 'education' }),
    handleDeleteExperience: (id: string) => setItemToDelete({ id, type: 'experience' }),
    confirmDelete,
    cancelDelete: () => setItemToDelete(null),
    handleSaveEducation,
    showExperienceForm,
    editingExperience,
    setShowExperienceForm,
    setEditingExperience,
    handleSaveExperience,
  }
}
