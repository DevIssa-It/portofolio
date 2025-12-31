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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-400">Loading profile data...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <AdminSidebar onLogout={handleLogout} />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Profile Management</h1>
            <p className="text-zinc-400">
              Manage your education and professional experience
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <StatCard
              title="Education"
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
          <div className="flex gap-4 mb-6 border-b border-zinc-800">
            <button
              onClick={() => setActiveTab('education')}
              className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
                activeTab === 'education' ? 'text-primary' : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Education
              {activeTab === 'education' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
                activeTab === 'experience' ? 'text-primary' : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Experience
              {activeTab === 'experience' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'education' ? (
              <motion.div
                key="education"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Education History</h2>
                  <Button onClick={() => setShowEducationForm(true)} className="gap-2">
                    <Plus size={20} />
                    Add Education
                  </Button>
                </div>

                {education.length === 0 ? (
                  <div className="text-center py-16 bg-zinc-900/30 rounded-lg border border-zinc-800">
                    <GraduationCap size={48} className="mx-auto text-zinc-600 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No education added</h3>
                    <p className="text-zinc-400 mb-6">Add your educational background</p>
                    <Button onClick={() => setShowEducationForm(true)}>
                      <Plus size={20} className="mr-2" />
                      Add Education
                    </Button>
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Work Experience</h2>
                  <Button onClick={() => setShowExperienceForm(true)} className="gap-2">
                    <Plus size={20} />
                    Add Experience
                  </Button>
                </div>

                {experience.length === 0 ? (
                  <div className="text-center py-16 bg-zinc-900/30 rounded-lg border border-zinc-800">
                    <Briefcase size={48} className="mx-auto text-zinc-600 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No experience added</h3>
                    <p className="text-zinc-400 mb-6">Add your professional experience</p>
                    <Button onClick={() => setShowExperienceForm(true)}>
                      <Plus size={20} className="mr-2" />
                      Add Experience
                    </Button>
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
