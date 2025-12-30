'use client'
import { LogOut, User, Settings, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { logoutUser } from '@/lib/services/auth.service'
import { ROUTES } from '@/lib/constants/api'

interface AdminSidebarProps {
  onLogout: () => void
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: ROUTES.ADMIN_DASHBOARD,
    },
    {
      label: 'Settings',
      icon: Settings,
      href: ROUTES.SETTINGS,
    },
  ]

  return (
    <div className="w-64 min-h-screen bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <Link href={ROUTES.ADMIN_DASHBOARD}>
          <h2 className="text-2xl font-bold gradient-text">Admin Panel</h2>
        </Link>
        <p className="text-xs text-zinc-500 mt-1">Portfolio Management</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                isActive
                  ? 'bg-primary text-white font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-zinc-800 pt-4">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-zinc-500">Administrator</p>
          </div>
        </div>
        
        <button
          onClick={async () => {
            await logoutUser()
            onLogout()
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
