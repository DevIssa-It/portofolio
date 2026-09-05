'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { useSession } from 'next-auth/react'
import { Save, User, Mail, Lock } from 'lucide-react'

export default function Settings() {
  const { data: session } = useSession()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }, 800)
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-black">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="pb-6 border-b-2 border-black">
            <span className="brutal-badge inline-block bg-sky-300 text-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase mb-2">
              {'// System Config'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight">
              Settings & Account
            </h1>
            <p className="text-xs font-mono text-zinc-600 mt-1">Manage administrator account and credentials.</p>
          </motion.div>

          {saved && (
            <div className="p-3 bg-emerald-100 border-2 border-black text-emerald-900 rounded-lg text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#000]">
              Settings saved successfully!
            </div>
          )}

          <div className="space-y-6">
            <div className="brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-black/10">
                <div className="w-9 h-9 rounded-lg bg-sky-100 border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-black uppercase">Profile Information</h3>
                  <p className="text-xs text-zinc-600 font-mono">Administrator display credentials</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-black uppercase">Full Name</label>
                  <input
                    defaultValue="A. Issadurrofiq Jaya Utama"
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:bg-sky-50 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-black uppercase">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={14} />
                    <input
                      type="email"
                      defaultValue={session?.user?.email || 'ahmadissadurrofiq17@gmail.com'}
                      className="w-full bg-white border-2 border-black rounded-lg pl-8 pr-3 py-2 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:bg-sky-50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-black/10">
                <div className="w-9 h-9 rounded-lg bg-sky-100 border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                  <Lock size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-black uppercase">Security & Password</h3>
                  <p className="text-xs text-zinc-600 font-mono">Update authentication credentials</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-black uppercase">Current Password</label>
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:bg-sky-50 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-black uppercase">New Password</label>
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:bg-sky-50 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                suppressHydrationWarning
                onClick={handleSave}
                disabled={saving}
                className="brutal-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
