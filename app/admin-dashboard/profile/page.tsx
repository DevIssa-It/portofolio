'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Briefcase, FileText } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { StatCard } from '@/components/admin/StatCard'
import { EducationSection } from '@/components/admin/EducationSection'
import { ExperienceSection } from '@/components/admin/ExperienceSection'
import { ResumeManager } from '@/components/admin/ResumeManager'
import { EducationFormDialog } from '@/components/admin/EducationFormDialog'
import { ExperienceFormDialog } from '@/components/admin/ExperienceFormDialog'
import { useProfileData } from '@/lib/hooks/useProfileData'
import { ROUTES } from '@/lib/constants/api'

export default function ProfileManagement() {
  const { status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'resume'>('education')

  const {
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
  } = useProfileData(status === 'authenticated')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.LOGIN)
    }
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

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-black">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="pb-6 border-b-2 border-black">
            <span className="brutal-badge inline-block bg-sky-300 text-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase mb-2">
              {'// Credentials & Document Assets'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight">
              Profile & Resume Management
            </h1>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              Manage verified education, industry experience, and live downloadable CV.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Education Records" value={education.length} icon={GraduationCap} />
            <StatCard title="Work Experience" value={experience.length} icon={Briefcase} />
            <StatCard title="CV Document" value="Live / PDF" icon={FileText} />
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { id: 'education', label: `Education History (${education.length})`, icon: GraduationCap },
              { id: 'experience', label: `Work Experience (${experience.length})`, icon: Briefcase },
              { id: 'resume', label: 'CV / Resume Document', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setActiveTab(tab.id as 'education' | 'experience' | 'resume')}
                  className={`brutal-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all border-2 border-black ${
                    isActive
                      ? 'bg-black text-sky-300 shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-white text-black hover:bg-sky-50 shadow-[2px_2px_0px_0px_#000]'
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
            {activeTab === 'resume' && <ResumeManager />}
          </AnimatePresence>
        </div>
      </main>

      <EducationFormDialog
        education={editingEducation}
        open={showEducationForm}
        onOpenChange={(open) => { setShowEducationForm(open); if (!open) setEditingEducation(null); }}
        onSave={handleSaveEducation}
      />

      <ExperienceFormDialog
        experience={editingExperience}
        open={showExperienceForm}
        onOpenChange={(open) => { setShowExperienceForm(open); if (!open) setEditingExperience(null); }}
        onSave={handleSaveExperience}
      />
    </div>
  )
}
