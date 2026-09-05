'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, ArrowLeft, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { loginUser } from '@/lib/services/auth.service'
import { ROUTES } from '@/lib/constants/api'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await loginUser({ email, password })
      if (!result.success) {
        setError(result.error || 'Invalid email or password')
      } else {
        window.location.href = ROUTES.ADMIN_DASHBOARD
      }
    } catch {
      setError('An error occurred during authentication. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black flex items-center justify-center p-6 relative">
      <div className="max-w-md w-full space-y-6">
        <Link
          href="/"
          className="brutal-btn inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border-2 border-black text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#000]"
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="brutal-card bg-white border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-xl p-8 space-y-6"
        >
          <div className="space-y-2 pb-4 border-b-2 border-black">
            <div className="flex items-center justify-between">
              <span className="brutal-badge bg-sky-300 text-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase">
                {'// Control Room'}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-[1px_1px_0px_0px_#000]" />
            </div>
            <h1 className="text-2xl font-black font-mono tracking-tight text-black uppercase flex items-center gap-2">
              <Lock size={22} /> Admin Console
            </h1>
            <p className="text-xs font-mono text-zinc-600">
              Enter administrative credentials to manage portfolio catalog and assets.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-2 border-black text-red-900 rounded-lg text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#000]">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-black uppercase block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" size={15} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full bg-white border-2 border-black rounded-lg pl-10 pr-3.5 py-2.5 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-black uppercase block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" size={15} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  className="w-full bg-white border-2 border-black rounded-lg pl-10 pr-12 py-2.5 text-xs font-mono text-black shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-sky-50"
                />
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black hover:text-zinc-600 text-xs font-mono font-bold"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="brutal-btn w-full mt-2 py-3 bg-sky-300 hover:bg-sky-400 text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t-2 border-black/10 text-center">
            <span className="text-[11px] font-mono text-zinc-600 block">
              {'// Authorized personnel only • Universitas Brawijaya'}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
