'use client'

import { Education } from '@/lib/services/education.service'
import { Experience } from '@/lib/services/experience.service'
import { Certification, CreateCertificationInput } from '@/types/certification'
import { EducationFormDialog } from '@/components/admin/EducationFormDialog'
import { ExperienceFormDialog } from '@/components/admin/ExperienceFormDialog'
import { CertificationFormDialog } from '@/components/admin/CertificationFormDialog'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'

interface ProfileDialogsProps {
  editingEducation: Education | null
  showEducationForm: boolean
  onCloseEducationForm: () => void
  onSaveEducation: (edu: Education) => Promise<void>
  editingExperience: Experience | null
  showExperienceForm: boolean
  onCloseExperienceForm: () => void
  onSaveExperience: (exp: Experience) => Promise<void>
  editingCert: Certification | null
  showCertForm: boolean
  onCloseCertForm: () => void
  onSaveCert: (data: CreateCertificationInput & { id?: string }) => Promise<void>
  deleteTarget: { type: 'education' | 'experience' | 'certification'; id: string } | null
  isDeleting: boolean
  onCancelDelete: () => void
  onConfirmDelete: () => Promise<void>
}

export function ProfileDialogs({
  editingEducation,
  showEducationForm,
  onCloseEducationForm,
  onSaveEducation,
  editingExperience,
  showExperienceForm,
  onCloseExperienceForm,
  onSaveExperience,
  editingCert,
  showCertForm,
  onCloseCertForm,
  onSaveCert,
  deleteTarget,
  isDeleting,
  onCancelDelete,
  onConfirmDelete,
}: ProfileDialogsProps) {
  return (
    <>
      <EducationFormDialog
        education={editingEducation}
        open={showEducationForm}
        onOpenChange={(open) => !open && onCloseEducationForm()}
        onSave={onSaveEducation}
      />
      <ExperienceFormDialog
        experience={editingExperience}
        open={showExperienceForm}
        onOpenChange={(open) => !open && onCloseExperienceForm()}
        onSave={onSaveExperience}
      />
      <CertificationFormDialog
        initialData={editingCert}
        open={showCertForm}
        onClose={onCloseCertForm}
        onSave={onSaveCert}
      />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && onCancelDelete()}
        title={deleteTarget ? `Delete ${deleteTarget.type === 'certification' ? 'Certificate' : deleteTarget.type === 'education' ? 'Education' : 'Experience'}` : 'Delete'}
        description="Are you sure you want to permanently delete this credential? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
        onConfirm={onConfirmDelete}
      />
    </>
  )
}
