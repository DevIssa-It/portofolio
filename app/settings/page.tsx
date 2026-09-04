'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Save, User, Mail, Lock } from 'lucide-react'

export default function Settings() {
  const { data: session } = useSession()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const handleLogout = () => {
    router.push('/api/auth/signout')
  }

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-black">
      <AdminSidebar />
      
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-6 border-b-2 border-black"
          >
            <span className="brutal-badge inline-block bg-sky-300 text-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase mb-2">
              {'// System Config'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight">
              Settings & Account
            </h1>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              Manage your administrative account and credentials.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3 pb-3 border-b-2 border-black/10">
                <div className="w-10 h-10 rounded-lg bg-sky-100 border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-black uppercase">Profile Information</h3>
                  <p className="text-xs text-zinc-600 font-mono">Update your administrator details</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono font-bold text-black uppercase">
                    Full Name
                  </label>
                  <input
                    id="name"
                    defaultValue="A. Issadurrofiq Jaya Utama"
                    placeholder="Your name"
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono font-bold text-black uppercase">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={15} />
                    <input
                      id="email"
                      type="email"
                      defaultValue={session?.user?.email || ''}
                      placeholder="admin@example.com"
                      className="w-full bg-white border-2 border-black rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3 pb-3 border-b-2 border-black/10">
                <div className="w-10 h-10 rounded-lg bg-sky-100 border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-black uppercase">Security & Password</h3>
                  <p className="text-xs text-zinc-600 font-mono">Manage your administrative password</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label htmlFor="current-password" className="text-xs font-mono font-bold text-black uppercase">
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="new-password" className="text-xs font-mono font-bold text-black uppercase">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="confirm-password" className="text-xs font-mono font-bold text-black uppercase">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
                  />
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex justify-end pt-2"
            >
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="brutal-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-1" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
