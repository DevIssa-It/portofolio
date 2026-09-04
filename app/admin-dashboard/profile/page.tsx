'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, GraduationCap, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { StatCard } from '@/components/admin/StatCard'
import { getEducation, createEducation, updateEducation, deleteEducation, Education } from '@/lib/services/education.service'
import { getExperience, createExperience, updateExperience, deleteExperience, Experience } from '@/lib/services/experience.service'
import { ROUTES } from '@/lib/constants/api'
import { EducationFormDialog } from '@/components/admin/EducationFormDialog'
import { ExperienceFormDialog } from '@/components/admin/ExperienceFormDialog'
import { EducationCard } from '@/components/admin/EducationCard'
import { ExperienceCard } from '@/components/admin/ExperienceCard'

export default function ProfileManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'education' | 'experience'>('education')
  
  // Education state
  const [education, setEducation] = useState<Education[]>([])
  const [showEducationForm, setShowEducationForm] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  
  // Experience state
  const [experience, setExperience] = useState<Experience[]>([])
  const [showExperienceForm, setShowExperienceForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.LOGIN)
    } else if (status === 'authenticated') {
      loadData()
    }
  }, [status, router])

  const loadData = async () => {
    try {
      const [eduResult, expResult] = await Promise.all([
        getEducation(),
        getExperience()
      ])
      
      if (eduResult.success && eduResult.data) {
        setEducation(eduResult.data)
      }
      if (expResult.success && expResult.data) {
        setExperience(expResult.data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    router.push('/api/auth/signout')
  }

  // Education handlers
  const handleDeleteEducation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education?')) return

    try {
      const result = await deleteEducation(id)
      if (result.success) {
        setEducation(education.filter((e) => e.id !== id))
      }
    } catch (error) {
      console.error('Error deleting education:', error)
    }
  }

  const handleEditEducation = (edu: Education) => {
    setEditingEducation(edu)
    setShowEducationForm(true)
  }

  const handleSaveEducation = async (edu: Education) => {
    try {
      const result = editingEducation 
        ? await updateEducation(edu)
        : await createEducation(edu)

      if (result.success && result.data) {
        if (editingEducation) {
          setEducation(education.map((e) => (e.id === result.data!.id ? result.data! : e)))
        } else {
          setEducation([...education, result.data])
        }
        
        setShowEducationForm(false)
        setEditingEducation(null)
      }
    } catch (error) {
      console.error('Error saving education:', error)
    }
  }

  // Experience handlers
  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    try {
      const result = await deleteExperience(id)
      if (result.success) {
        setExperience(experience.filter((e) => e.id !== id))
      }
    } catch (error) {
      console.error('Error deleting experience:', error)
    }
  }

  const handleEditExperience = (exp: Experience) => {
    setEditingExperience(exp)
    setShowExperienceForm(true)
  }

  const handleSaveExperience = async (exp: Experience) => {
    try {
      const result = editingExperience 
        ? await updateExperience(exp)
        : await createExperience(exp)

      if (result.success && result.data) {
        if (editingExperience) {
          setExperience(experience.map((e) => (e.id === result.data!.id ? result.data! : e)))
        } else {
          setExperience([...experience, result.data])
        }
        
        setShowExperienceForm(false)
        setEditingExperience(null)
      }
    } catch (error) {
      console.error('Error saving experience:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4 p-8 brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-10 h-10 border-4 border-black border-t-sky-400 rounded-full animate-spin" />
          <p className="text-xs font-mono font-bold text-black uppercase">Loading profile data...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-black">
      <AdminSidebar />
      
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-6 border-b-2 border-black"
          >
            <span className="brutal-badge inline-block bg-sky-300 text-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase mb-2">
              {'// Credentials & History'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight">
              Profile Management
            </h1>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              Manage your formal education and verified industry work experiences.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <StatCard
              title="Education Records"
              value={education.length}
              icon={GraduationCap}
            />
            <StatCard
              title="Work Experience"
              value={experience.length}
              icon={Briefcase}
            />
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('education')}
              className={`brutal-btn px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === 'education'
                  ? 'bg-black text-sky-300 border-2 border-black shadow-[3px_3px_0px_0px_#000]'
                  : 'bg-white text-black hover:bg-sky-50 border-2 border-black shadow-[2px_2px_0px_0px_#000]'
              }`}
            >
              Education History ({education.length})
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`brutal-btn px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === 'experience'
                  ? 'bg-black text-sky-300 border-2 border-black shadow-[3px_3px_0px_0px_#000]'
                  : 'bg-white text-black hover:bg-sky-50 border-2 border-black shadow-[2px_2px_0px_0px_#000]'
              }`}
            >
              Work Experience ({experience.length})
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'education' ? (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-black uppercase">Formal Education</h2>
                  <button
                    type="button"
                    onClick={() => setShowEducationForm(true)}
                    className="brutal-btn flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
                  >
                    <Plus size={16} />
                    <span>Add Education</span>
                  </button>
                </div>

                {education.length === 0 ? (
                  <div className="text-center py-16 brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-8">
                    <GraduationCap size={40} className="mx-auto text-black mb-3" />
                    <h3 className="text-lg font-black text-black uppercase mb-1">No education records yet</h3>
                    <p className="text-zinc-600 text-xs font-mono mb-4">Add your degrees and institutions.</p>
                    <button
                      type="button"
                      onClick={() => setShowEducationForm(true)}
                      className="brutal-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
                    >
                      <Plus size={16} />
                      <span>Add Education</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <EducationCard
                        key={edu.id}
                        education={edu}
                        onEdit={handleEditEducation}
                        onDelete={handleDeleteEducation}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-black uppercase">Work Experience</h2>
                  <button
                    type="button"
                    onClick={() => setShowExperienceForm(true)}
                    className="brutal-btn flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
                  >
                    <Plus size={16} />
                    <span>Add Experience</span>
                  </button>
                </div>

                {experience.length === 0 ? (
                  <div className="text-center py-16 brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-8">
                    <Briefcase size={40} className="mx-auto text-black mb-3" />
                    <h3 className="text-lg font-black text-black uppercase mb-1">No experience records yet</h3>
                    <p className="text-zinc-600 text-xs font-mono mb-4">Add your professional work experience.</p>
                    <button
                      type="button"
                      onClick={() => setShowExperienceForm(true)}
                      className="brutal-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black"
                    >
                      <Plus size={16} />
                      <span>Add Experience</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <ExperienceCard
                        key={exp.id}
                        experience={exp}
                        onEdit={handleEditExperience}
                        onDelete={handleDeleteExperience}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <EducationFormDialog
        education={editingEducation}
        open={showEducationForm}
        onOpenChange={(open) => {
          setShowEducationForm(open)
          if (!open) setEditingEducation(null)
        }}
        onSave={handleSaveEducation}
      />

      <ExperienceFormDialog
        experience={editingExperience}
        open={showExperienceForm}
        onOpenChange={(open) => {
          setShowExperienceForm(open)
          if (!open) setEditingExperience(null)
        }}
        onSave={handleSaveExperience}
      />
    </div>
  )
}
