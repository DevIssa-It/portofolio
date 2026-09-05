'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { BarChart3 } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard'
import { ROUTES } from '@/lib/constants/api'

export default function AnalyticsAdminPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push(ROUTES.LOGIN)
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-mono text-xs">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-black">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="pb-4 border-b-2 border-black space-y-1">
            <span className="brutal-badge inline-block bg-sky-300 text-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase">
              {'// Observability & Telemetry'}
            </span>
            <h1 className="text-3xl font-black text-black uppercase tracking-tight flex items-center gap-2">
              <BarChart3 size={26} /> Recruiter & Traffic Analytics
            </h1>
            <p className="text-xs font-mono text-zinc-600">
              Real-time insights on resume downloads, project demo visits, and recruitment engagement.
            </p>
          </div>

          <AnalyticsDashboard />
        </div>
      </main>
    </div>
  )
}
