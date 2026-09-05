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

  const handleDeleteEducation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education?')) return
    const result = await deleteEducation(id)
    if (result.success) setEducation((prev) => prev.filter((e) => e.id !== id))
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

  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return
    const result = await deleteExperience(id)
    if (result.success) setExperience((prev) => prev.filter((e) => e.id !== id))
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
    handleDeleteEducation,
    handleSaveEducation,
    showExperienceForm,
    editingExperience,
    setShowExperienceForm,
    setEditingExperience,
    handleDeleteExperience,
    handleSaveExperience,
  }
}
