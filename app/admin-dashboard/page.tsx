'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, FolderGit2, TrendingUp, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { StatCard } from '@/components/admin/StatCard'
import { ProjectCard } from '@/components/admin/ProjectCard'
import { ProjectFormDialog } from '@/components/admin/ProjectFormDialog'
import { getProjects, createProject, updateProject, deleteProject, Project } from '@/lib/services/project.service'
import { ROUTES } from '@/lib/constants/api'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.LOGIN)
    } else if (status === 'authenticated') {
      loadProjects()
    }
  }, [status, router])

  const loadProjects = async () => {
    try {
      const result = await getProjects()
      if (result.success && result.data) {
        setProjects(result.data)
      }
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    router.push('/api/auth/signout')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const result = await deleteProject(id)
      if (result.success) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleSave = async (project: Project) => {
    try {
      const result = editingProject 
        ? await updateProject(project)
        : await createProject(project)

      if (result.success && result.data) {
        if (editingProject) {
          setProjects(projects.map((p) => (p.id === result.data!.id ? result.data! : p)))
        } else {
          setProjects([...projects, result.data])
        }
        
        setShowForm(false)
        setEditingProject(null)
      }
    } catch (error) {
      console.error('Error saving project:', error)
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
          <p className="text-zinc-400">Loading dashboard...</p>
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
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-zinc-400">
                  Welcome back, {session?.user?.email || 'Admin'}
                </p>
              </div>
              <Button onClick={() => setShowForm(true)} size="lg" className="gap-2">
                <Plus size={20} />
                Add Project
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <StatCard
              title="Total Projects"
              value={projects.length}
              icon={FolderGit2}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Technologies"
              value={new Set(projects.flatMap((p) => p.technologies)).size}
              icon={TrendingUp}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard title="Portfolio Views" value="2.4K" icon={Eye} trend={{ value: 23, isPositive: true }} />
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Projects</h2>
              <p className="text-zinc-400 text-sm">{projects.length} projects</p>
            </div>

            {projects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-900 rounded-full mb-4">
                  <FolderGit2 size={40} className="text-zinc-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
                <p className="text-zinc-400 mb-6">Get started by adding your first project</p>
                <Button onClick={() => setShowForm(true)} size="lg">
                  <Plus size={20} className="mr-2" />
                  Add Your First Project
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <ProjectFormDialog
        project={editingProject}
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open)
          if (!open) setEditingProject(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}
