'use client'

import { useState, useEffect, useCallback } from 'react'
import { getEducation, createEducation, updateEducation, deleteEducation, Education } from '@/lib/services/education.service'
import { getExperience, createExperience, updateExperience, deleteExperience, Experience } from '@/lib/services/experience.service'
import { sortChronologically } from '@/lib/utils/date-sorter'

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

  const loadData = useCallback(async () => {
    try {
      const [eduResult, expResult] = await Promise.all([getEducation(), getExperience()])
      if (eduResult.success && eduResult.data) setEducation(sortChronologically(eduResult.data))
      if (expResult.success && expResult.data) setExperience(sortChronologically(expResult.data))
    } catch (error) {
      console.error('Error loading profile data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) loadData()
  }, [isAuthenticated, loadData])

  const confirmDelete = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)
    try {
      if (itemToDelete.type === 'education') {
        const res = await deleteEducation(itemToDelete.id)
        if (res.success) setEducation((prev) => prev.filter((e) => e.id !== itemToDelete.id))
      } else {
        const res = await deleteExperience(itemToDelete.id)
        if (res.success) setExperience((prev) => prev.filter((e) => e.id !== itemToDelete.id))
      }
      setItemToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSaveEducation = async (edu: Education) => {
    const res = editingEducation ? await updateEducation(edu) : await createEducation(edu)
    if (res.success && res.data) {
      setEducation((prev) => sortChronologically(editingEducation ? prev.map((e) => (e.id === res.data!.id ? res.data! : e)) : [...prev, res.data!]))
      setShowEducationForm(false)
      setEditingEducation(null)
    }
  }

  const handleSaveExperience = async (exp: Experience) => {
    const res = editingExperience ? await updateExperience(exp) : await createExperience(exp)
    if (res.success && res.data) {
      setExperience((prev) => sortChronologically(editingExperience ? prev.map((e) => (e.id === res.data!.id ? res.data! : e)) : [...prev, res.data!]))
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
