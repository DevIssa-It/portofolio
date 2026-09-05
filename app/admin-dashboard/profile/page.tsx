'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { GraduationCap, Briefcase, FileText, Award } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ProfileHeaderStats } from '@/components/admin/ProfileHeaderStats'
import { ProfileDialogs } from '@/components/admin/ProfileDialogs'
import { EducationSection } from '@/components/admin/EducationSection'
import { ExperienceSection } from '@/components/admin/ExperienceSection'
import { CertificationSection } from '@/components/admin/CertificationSection'
import { ResumeManager } from '@/components/admin/ResumeManager'
import { useProfileData } from '@/lib/hooks/useProfileData'
import { useCertificationsData } from '@/lib/hooks/useCertificationsData'
import { ROUTES } from '@/lib/constants/api'

export default function ProfileManagement() {
  const { status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'certifications' | 'resume'>('education')

  const {
    education, experience, loading,
    showEducationForm, editingEducation, setShowEducationForm, setEditingEducation,
    itemToDelete, isDeleting, handleDeleteEducation, handleDeleteExperience,
    confirmDelete, cancelDelete, handleSaveEducation,
    showExperienceForm, editingExperience, setShowExperienceForm, setEditingExperience,
    handleSaveExperience,
  } = useProfileData(status === 'authenticated')

  const {
    certifications, showForm: showCertForm, editingCert,
    setShowForm: setShowCertForm, setEditingCert,
    itemToDelete: certToDelete, isDeleting: isDeletingCert,
    handleDelete: handleDeleteCert, confirmDelete: confirmDeleteCert,
    cancelDelete: cancelDeleteCert, handleSave: handleSaveCert,
  } = useCertificationsData(status === 'authenticated')

  useEffect(() => {
    if (status === 'unauthenticated') router.push(ROUTES.LOGIN)
  }, [status, router])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-8 brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl">
          <div className="w-10 h-10 border-4 border-black border-t-sky-400 rounded-full animate-spin" />
          <p className="text-xs font-mono font-bold text-black uppercase">Loading credentials...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'education', label: `Education (${education.length})`, icon: GraduationCap },
    { id: 'experience', label: `Experience (${experience.length})`, icon: Briefcase },
    { id: 'certifications', label: `Certificates (${certifications.length})`, icon: Award },
    { id: 'resume', label: 'CV Document', icon: FileText },
  ] as const

  const deleteTarget = itemToDelete
    ? { type: itemToDelete.type, id: itemToDelete.id }
    : certToDelete ? { type: 'certification' as const, id: certToDelete } : null

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-black">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <ProfileHeaderStats
            educationCount={education.length}
            experienceCount={experience.length}
            certificationsCount={certifications.length}
          />

          <div className="flex flex-wrap gap-2.5">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`brutal-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all border-2 border-black ${
                    isActive ? 'bg-black text-sky-300 shadow-[3px_3px_0px_0px_#000]' : 'bg-white text-black hover:bg-sky-50 shadow-[2px_2px_0px_0px_#000]'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'education' && (
              <EducationSection
                education={education}
                onAdd={() => setShowEducationForm(true)}
                onEdit={(edu) => { setEditingEducation(edu); setShowEducationForm(true); }}
                onDelete={handleDeleteEducation}
              />
            )}
            {activeTab === 'experience' && (
              <ExperienceSection
                experience={experience}
                onAdd={() => setShowExperienceForm(true)}
                onEdit={(exp) => { setEditingExperience(exp); setShowExperienceForm(true); }}
                onDelete={handleDeleteExperience}
              />
            )}
            {activeTab === 'certifications' && (
              <CertificationSection
                certifications={certifications}
                onAdd={() => { setEditingCert(null); setShowCertForm(true); }}
                onEdit={(cert) => { setEditingCert(cert); setShowCertForm(true); }}
                onDelete={handleDeleteCert}
              />
            )}
            {activeTab === 'resume' && <ResumeManager />}
          </AnimatePresence>
        </div>
      </main>

      <ProfileDialogs
        editingEducation={editingEducation}
        showEducationForm={showEducationForm}
        onCloseEducationForm={() => { setShowEducationForm(false); setEditingEducation(null); }}
        onSaveEducation={handleSaveEducation}
        editingExperience={editingExperience}
        showExperienceForm={showExperienceForm}
        onCloseExperienceForm={() => { setShowExperienceForm(false); setEditingExperience(null); }}
        onSaveExperience={handleSaveExperience}
        editingCert={editingCert}
        showCertForm={showCertForm}
        onCloseCertForm={() => { setShowCertForm(false); setEditingCert(null); }}
        onSaveCert={handleSaveCert}
        deleteTarget={deleteTarget}
        isDeleting={isDeleting || isDeletingCert}
        onCancelDelete={() => { cancelDelete(); cancelDeleteCert(); }}
        onConfirmDelete={itemToDelete ? confirmDelete : confirmDeleteCert}
      />
    </div>
  )
}
