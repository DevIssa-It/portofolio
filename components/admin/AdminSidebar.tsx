'use client'

import { useState } from 'react'
import { LogOut, User, Settings, LayoutDashboard, GraduationCap, ExternalLink, MessageSquare, BarChart3, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants/api'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'

interface AdminSidebarProps {
  onLogout?: () => void
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.ADMIN_DASHBOARD },
    { label: 'Inquiries', icon: Mail, href: '/admin-dashboard/inquiries' },
    { label: 'Profile & Resume', icon: GraduationCap, href: '/admin-dashboard/profile' },
    { label: 'Guestbook', icon: MessageSquare, href: '/admin-dashboard/guestbook' },
    { label: 'Analytics', icon: BarChart3, href: '/admin-dashboard/analytics' },
    { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
  ]

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true)
      if (onLogout) onLogout()
      await signOut({ redirect: false })
      window.location.href = ROUTES.LOGIN
    } catch (error) {
      console.error('Logout error:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      <aside className="w-64 min-h-screen bg-white border-r-2 border-black p-5 flex flex-col justify-between shadow-[4px_0px_0px_0px_#000] relative z-20">
        <div className="space-y-6">
          <div className="space-y-1.5 pb-4 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-[1px_1px_0px_0px_#000]" />
              <span className="brutal-badge bg-sky-200 text-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                Admin Console
              </span>
            </div>
            <Link href={ROUTES.ADMIN_DASHBOARD} className="block">
              <h2 className="text-base font-black font-mono tracking-tight text-black uppercase">
                A. Issadurrofiq
              </h2>
            </Link>
            <p className="text-[11px] font-mono text-zinc-600">Portfolio Management</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all',
                    isActive
                      ? 'bg-black text-sky-300 border-2 border-black shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-white text-black hover:bg-sky-50 border-2 border-transparent hover:border-black'
                  )}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-4 border-t-2 border-black">
          <Link
            href="/"
            target="_blank"
            className="brutal-btn w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-sky-100 text-black text-xs font-mono font-bold border-2 border-black"
          >
            <ExternalLink size={14} />
            <span>View Live Site</span>
          </Link>

          <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000]">
            <div className="w-8 h-8 rounded-md bg-sky-200 border border-black flex items-center justify-center font-mono font-bold text-xs text-black">
              <User size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-black font-mono leading-tight">Admin</p>
              <p className="text-[10px] font-mono text-zinc-600 uppercase">Authenticated</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            disabled={isLoggingOut}
            className="brutal-btn w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-900 text-xs font-mono font-bold border-2 border-black disabled:opacity-50"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Sign Out Session"
        description="Are you sure you want to end your administrative session? You will be redirected to the login page."
        confirmText="Yes, Sign Out"
        cancelText="Cancel"
        variant="danger"
        loading={isLoggingOut}
        onConfirm={handleConfirmLogout}
      />
    </>
  )
}
