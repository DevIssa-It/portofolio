'use client'

import { FileDown, ExternalLink, Github, Copy, RefreshCw, Activity } from 'lucide-react'
import { useAnalyticsData } from '@/lib/hooks/useAnalyticsData'

export function AnalyticsDashboard() {
  const { summary, loading, refresh } = useAnalyticsData()

  const stats = [
    { label: 'CV Downloads', value: summary?.totalCvDownloads ?? 0, icon: FileDown, bg: 'bg-sky-200' },
    { label: 'Live Demo Visits', value: summary?.totalDemoClicks ?? 0, icon: ExternalLink, bg: 'bg-emerald-200' },
    { label: 'GitHub Clicks', value: summary?.totalGithubClicks ?? 0, icon: Github, bg: 'bg-zinc-200' },
    { label: 'Contact Copies', value: summary?.totalContactCopies ?? 0, icon: Copy, bg: 'bg-blue-100' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b-2 border-black">
        <div>
          <span className="brutal-badge bg-emerald-300 text-black px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase">
            {'// Recruiter Insights'}
          </span>
          <h2 className="text-xl font-black font-mono uppercase tracking-tight text-black flex items-center gap-2 mt-1">
            <Activity size={18} /> Performance & Engagement Metrics
          </h2>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="brutal-btn px-3 py-1.5 bg-white hover:bg-zinc-100 text-black text-xs font-mono font-bold border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-600 uppercase">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center ${stat.bg} text-black shadow-[2px_2px_0px_0px_#000]`}>
                  <Icon size={16} />
                </div>
              </div>
              <p className="text-3xl font-black font-mono text-black">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="brutal-card bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-6 space-y-4">
        <div className="pb-3 border-b-2 border-black flex items-center justify-between">
          <h3 className="text-sm font-black font-mono text-black uppercase">Recent Event Stream</h3>
          <span className="text-[11px] font-mono text-zinc-500">Total: {summary?.totalEvents ?? 0} events recorded</span>
        </div>

        {loading ? (
          <div className="p-6 text-center font-mono text-xs text-zinc-500">Loading events...</div>
        ) : !summary?.recentEvents || summary.recentEvents.length === 0 ? (
          <div className="p-6 text-center font-mono text-xs text-zinc-500">No interaction events recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b-2 border-black bg-zinc-50">
                  <th className="p-2.5 font-black uppercase text-black">Action Type</th>
                  <th className="p-2.5 font-black uppercase text-black">Target Entity</th>
                  <th className="p-2.5 font-black uppercase text-black text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {summary.recentEvents.slice(0, 10).map((evt) => (
                  <tr key={evt.id} className="hover:bg-sky-50/50 transition-colors">
                    <td className="p-2.5 font-bold text-black">
                      <span className="px-2 py-0.5 rounded border border-black bg-zinc-100 text-[10px]">{evt.type}</span>
                    </td>
                    <td className="p-2.5 text-zinc-700">{evt.target || 'General'}</td>
                    <td className="p-2.5 text-zinc-500 text-right">{new Date(evt.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
