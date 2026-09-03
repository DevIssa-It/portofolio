/**
 * Custom Hook: useProjectForm
 * Encapsulates form state, image uploads, and submit logic for Project dialogs.
 * Follows Single Responsibility Principle (SRP).
 */

'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/types/project'
import { uploadProjectImage } from '@/lib/services/project.service'

const emptyProject: Project = {
  id: '',
  title: '',
  description: '',
  image: '',
  technologies: [],
  tags: [],
  github: '',
  demo: '',
}

export function useProjectForm(
  project: Project | null,
  open: boolean,
  onSave: (project: Project) => void,
  onClose: () => void
) {
  const [formData, setFormData] = useState<Project>(project || emptyProject)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setFormData(project ? { ...project } : { ...emptyProject })
    setImageFile(null)
  }, [project, open])

  const handleImageFileChange = (file: File | null, previewUrl: string) => {
    setImageFile(file)
    setFormData((prev) => ({ ...prev, image: previewUrl }))
  }

  const handleImageUrlChange = (url: string) => {
    setImageFile(null)
    setFormData((prev) => ({ ...prev, image: url }))
  }

  const updateField = <K extends keyof Project>(field: K, value: Project[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = formData.image

      if (imageFile) {
        const result = await uploadProjectImage(imageFile)
        if (result.success && result.data) {
          imageUrl = result.data
        } else {
          alert('Failed to upload image: ' + (result.error || 'Unknown error'))
          setUploading(false)
          return
        }
      }

      onSave({
        ...formData,
        image: imageUrl,
        id: project?.id || formData.id || Date.now().toString(),
      })
      onClose()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Failed to save project')
    } finally {
      setUploading(false)
    }
  }

  return {
    formData,
    imageFile,
    uploading,
    handleImageFileChange,
    handleImageUrlChange,
    updateField,
    handleSubmit,
  }
}
