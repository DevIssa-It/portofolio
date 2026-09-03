'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderGit2, TrendingUp, Eye } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { StatCard } from '@/components/admin/StatCard'
import { ProjectCard } from '@/components/admin/ProjectCard'
import { ProjectFormDialog } from '@/components/admin/ProjectFormDialog'
import { DashboardHeader } from '@/components/admin/DashboardHeader'
import { SyncStatusBanner } from '@/components/admin/SyncStatusBanner'
import { EmptyProjectsState } from '@/components/admin/EmptyProjectsState'
import { useAdminProjects } from '@/lib/hooks/useAdminProjects'
import { ROUTES } from '@/lib/constants/api'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const {
    projects,
    loading,
    isSyncing,
    showForm,
    editingProject,
    syncFeedback,
    handleSyncGithub,
    handleDelete,
    handleEdit,
    handleSave,
    closeForm,
    openAddForm,
    clearSyncFeedback,
  } = useAdminProjects(status === 'authenticated')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.LOGIN)
    }
  }, [status, router])

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

  const uniqueTechnologiesCount = new Set(
    projects.flatMap((p) => p.technologies)
  ).size

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <AdminSidebar onLogout={() => router.push('/api/auth/signout')} />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader
            adminEmail={session?.user?.email}
            isSyncing={isSyncing}
            onSync={handleSyncGithub}
            onAdd={openAddForm}
          />

          <SyncStatusBanner
            feedback={syncFeedback}
            onDismiss={clearSyncFeedback}
          />

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
              value={uniqueTechnologiesCount}
              icon={TrendingUp}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Portfolio Views"
              value="2.4K"
              icon={Eye}
              trend={{ value: 23, isPositive: true }}
            />
          </motion.div>

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
              <EmptyProjectsState
                isSyncing={isSyncing}
                onSync={handleSyncGithub}
                onAdd={openAddForm}
              />
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
          if (!open) closeForm()
        }}
        onSave={handleSave}
      />
    </div>
  )
}
