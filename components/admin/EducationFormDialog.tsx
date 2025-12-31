'use client'
import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { GraduationCap } from 'lucide-react'

interface Education {
  id: string
  school: string
  degree: string
  year: string
  description: string
}

interface EducationFormDialogProps {
  education: Education | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (education: Education) => void
}

export function EducationFormDialog({ education, open, onOpenChange, onSave }: EducationFormDialogProps) {
  const [formData, setFormData] = React.useState<Education>(
    education || {
      id: '',
      school: '',
      degree: '',
      year: '',
      description: '',
    }
  )

  React.useEffect(() => {
    if (education) {
      setFormData(education)
    } else {
      setFormData({
        id: '',
        school: '',
        degree: '',
        year: '',
        description: '',
      })
    }
  }, [education, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const educationToSave = {
      ...formData,
      id: education?.id || formData.id || Date.now().toString(),
    }
    
    onSave(educationToSave)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="text-primary" size={24} />
            {education ? 'Edit Education' : 'Add New Education'}
          </DialogTitle>
          <DialogDescription>
            {education ? 'Update your education details' : 'Fill in the details to add new education'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school">School / University *</Label>
            <Input
              id="school"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              placeholder="Brawijaya University"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">Degree / Program *</Label>
            <Input
              id="degree"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="Bachelor of Computer Science"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Year / Period *</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="Aug 2023 - Present"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Relevant coursework, achievements, etc."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {education ? 'Update Education' : 'Add Education'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
