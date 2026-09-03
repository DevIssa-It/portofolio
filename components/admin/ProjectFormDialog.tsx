'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Sparkles } from 'lucide-react'
import { uploadProjectImage } from '@/lib/services/project.service'
import { Project } from '@/types/project'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { TechnologyTagInput } from '@/components/admin/TechnologyTagInput'
import { ProjectUrlFields } from '@/components/admin/ProjectUrlFields'

interface ProjectFormDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (project: Project) => void
}

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

export function ProjectFormDialog({
  project,
  open,
  onOpenChange,
  onSave,
}: ProjectFormDialogProps) {
  const [formData, setFormData] = React.useState<Project>(project || emptyProject)
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [uploading, setUploading] = React.useState(false)

  React.useEffect(() => {
    setFormData(project ? { ...project } : { ...emptyProject })
    setImageFile(null)
  }, [project, open])

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
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Failed to save project')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" size={24} />
            {project ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
          <DialogDescription>
            {project
              ? 'Update your project details'
              : 'Fill in the details to create a new project'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="My Awesome Project"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="A brief description of your project..."
              rows={4}
              required
            />
          </div>

          <ImageUploadField
            value={formData.image}
            imageFile={imageFile}
            onFileChange={(file, previewUrl) => {
              setImageFile(file)
              setFormData((prev) => ({ ...prev, image: previewUrl }))
            }}
            onUrlChange={(url) => {
              setImageFile(null)
              setFormData((prev) => ({ ...prev, image: url }))
            }}
          />

          <TechnologyTagInput
            technologies={formData.technologies}
            onChange={(technologies) =>
              setFormData((prev) => ({ ...prev, technologies }))
            }
          />

          <ProjectUrlFields
            github={formData.github}
            demo={formData.demo}
            onChange={(field, value) =>
              setFormData((prev) => ({ ...prev, [field]: value }))
            }
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
