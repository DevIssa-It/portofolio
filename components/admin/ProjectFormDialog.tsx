'use client'
import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Image as ImageIcon, Link as LinkIcon, Github, Sparkles, Upload } from 'lucide-react'
import { uploadProjectImage } from '@/lib/services/project.service'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
}

interface ProjectFormDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (project: Project) => void
}

export function ProjectFormDialog({ project, open, onOpenChange, onSave }: ProjectFormDialogProps) {
  const [formData, setFormData] = React.useState<Project>(
    project || {
      id: '',
      title: '',
      description: '',
      image: '',
      technologies: [],
      github: '',
      demo: '',
    }
  )
  const [techInput, setTechInput] = React.useState('')
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [uploading, setUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (project) {
      setFormData(project)
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        image: '',
        technologies: [],
        github: '',
        demo: '',
      })
    }
    setImageFile(null)
  }, [project, open])

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setFormData({ ...formData, image: previewUrl })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = formData.image

      // Upload image file if selected
      if (imageFile) {
        const result = await uploadProjectImage(imageFile)
        if (result.success && result.data) {
          imageUrl = result.data
        } else {
          alert('Failed to upload image: ' + result.error)
          setUploading(false)
          return
        }
      }

      const projectToSave = {
        ...formData,
        image: imageUrl,
        // Untuk edit: gunakan ID asli dari project prop, untuk baru: generate ID baru
        id: project?.id || formData.id || Date.now().toString(),
      }
      
      onSave(projectToSave)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Failed to save project')
    } finally {
      setUploading(false)
    }
  }

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      })
      setTechInput('')
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    })
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
            {project ? 'Update your project details' : 'Fill in the details to create a new project'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="My Awesome Project"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A brief description of your project..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Project Image *</Label>
            <div className="space-y-3">
              {/* File Upload Option */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full gap-2"
                >
                  <Upload size={18} />
                  {imageFile ? imageFile.name : 'Upload Image File'}
                </Button>
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="text-xs text-zinc-500">OR</span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>

              {/* URL Input Option */}
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <Input
                  id="image"
                  value={imageFile ? '' : formData.image}
                  onChange={(e) => {
                    setImageFile(null)
                    setFormData({ ...formData, image: e.target.value })
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="pl-12"
                  disabled={!!imageFile}
                />
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech">Technologies</Label>
            <div className="flex gap-2">
              <Input
                id="tech"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTechnology()
                  }
                }}
                placeholder="React, Node.js, etc."
              />
              <Button type="button" onClick={addTechnology} variant="secondary">
                Add
              </Button>
            </div>
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-semibold"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-primary/70"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <div className="relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className="pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo">Demo URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <Input
                  id="demo"
                  value={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                  placeholder="https://demo.com"
                  className="pl-12"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={uploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                project ? 'Update Project' : 'Create Project'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
