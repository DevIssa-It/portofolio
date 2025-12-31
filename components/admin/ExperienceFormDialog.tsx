'use client'
import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Briefcase } from 'lucide-react'

interface Experience {
  id: string
  company: string
  role: string
  year: string
  description: string
}

interface ExperienceFormDialogProps {
  experience: Experience | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (experience: Experience) => void
}

export function ExperienceFormDialog({ experience, open, onOpenChange, onSave }: ExperienceFormDialogProps) {
  const [formData, setFormData] = React.useState<Experience>(
    experience || {
      id: '',
      company: '',
      role: '',
      year: '',
      description: '',
    }
  )

  React.useEffect(() => {
    if (experience) {
      setFormData(experience)
    } else {
      setFormData({
        id: '',
        company: '',
        role: '',
        year: '',
        description: '',
      })
    }
  }, [experience, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const experienceToSave = {
      ...formData,
      id: experience?.id || formData.id || Date.now().toString(),
    }
    
    onSave(experienceToSave)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="text-primary" size={24} />
            {experience ? 'Edit Experience' : 'Add New Experience'}
          </DialogTitle>
          <DialogDescription>
            {experience ? 'Update your experience details' : 'Fill in the details to add new experience'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company / Organization *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Core Initiative x Rakamin Academy"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role / Position *</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Frontend Developer Intern"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Year / Period *</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="Sep 2025"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Key responsibilities, achievements, technologies used..."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {experience ? 'Update Experience' : 'Add Experience'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
