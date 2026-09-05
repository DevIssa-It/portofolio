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
import { Project } from '@/types/project'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { TechnologyTagInput } from '@/components/admin/TechnologyTagInput'
import { ProjectUrlFields } from '@/components/admin/ProjectUrlFields'
import { useProjectForm } from '@/lib/hooks/useProjectForm'

interface ProjectFormDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (project: Project) => void
}

export function ProjectFormDialog({
  project,
  open,
  onOpenChange,
  onSave,
}: ProjectFormDialogProps) {
  const {
    formData,
    imageFile,
    uploading,
    handleImageFileChange,
    handleImageUrlChange,
    updateField,
    handleSubmit,
  } = useProjectForm(project, open, onSave, () => onOpenChange(false))

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
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="My Awesome Project"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="A brief description of your project..."
              rows={4}
              required
            />
          </div>

          <ImageUploadField
            value={formData.image}
            imageFile={imageFile}
            onFileChange={handleImageFileChange}
            onUrlChange={handleImageUrlChange}
          />

          <TechnologyTagInput
            technologies={formData.technologies}
            onChange={(techs) => updateField('technologies', techs)}
          />

          <ProjectUrlFields
            github={formData.github}
            demo={formData.demo}
            onChange={(field, value) => updateField(field, value)}
          />

          <div className="space-y-2">
            <Label htmlFor="problemStatement">Architecture & Problem Statement</Label>
            <Textarea
              id="problemStatement"
              value={formData.problemStatement || ''}
              onChange={(e) => updateField('problemStatement', e.target.value)}
              placeholder="What core engineering challenge did this solve?"
              rows={2}
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-zinc-50 border border-black/20 rounded-lg">
            <input
              type="checkbox"
              id="featured"
              checked={!!formData.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="w-4 h-4 accent-black rounded"
            />
            <Label htmlFor="featured" className="cursor-pointer text-xs font-mono font-bold">
              Pin as Featured Project (Display at top with badge)
            </Label>
          </div>

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
