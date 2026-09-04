'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ProjectCard } from '@/components/admin/ProjectCard'
import { ProjectFormDialog } from '@/components/admin/ProjectFormDialog'
import { DashboardHeader } from '@/components/admin/DashboardHeader'
import { DashboardStats } from '@/components/admin/DashboardStats'
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
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4 p-8 brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-10 h-10 border-4 border-black border-t-sky-400 rounded-full animate-spin" />
          <p className="text-xs font-mono font-bold text-black uppercase">Loading dashboard...</p>
        </motion.div>
      </div>
    )
  }

  const techCount = new Set(projects.flatMap((p) => p.technologies)).size

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-black">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
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

          <DashboardStats
            totalProjects={projects.length}
            totalTechnologies={techCount}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="brutal-badge inline-block bg-emerald-300 text-black px-2.5 py-0.5 text-xs font-mono uppercase mb-1">
                  {'// Catalog'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
                  Registered Works
                </h2>
              </div>
              <span className="brutal-badge bg-white text-black px-3 py-1 text-xs font-mono">
                {projects.length} Repositories Registered
              </span>
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
