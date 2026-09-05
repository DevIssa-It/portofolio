'use client'

import { X, ArrowUpRight, Github, Target, Layers, TrendingUp, Check } from 'lucide-react'
import { Project } from '@/types/project'
import { useAnalyticsTracker } from '@/lib/hooks/useAnalyticsTracker'

interface ProjectCaseStudyModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectCaseStudyModal({
  project,
  isOpen,
  onClose,
}: ProjectCaseStudyModalProps) {
  const { trackEvent } = useAnalyticsTracker()
  if (!isOpen || !project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="brutal-card bg-white border-2 border-black shadow-[6px_6px_0px_0px_#000] w-full max-w-2xl rounded-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b-2 border-black bg-zinc-50 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="brutal-badge text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-200 text-black font-bold">
                {'// Case Study'}
              </span>
              {project.role && (
                <span className="text-[11px] font-mono text-zinc-600 font-semibold">
                  • {project.role}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-black leading-tight">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study dialog"
            className="p-1 text-black hover:bg-zinc-200 rounded border border-black shadow-[1px_1px_0px_0px_#000]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="space-y-1.5 p-4 rounded-lg border-2 border-black bg-zinc-50 shadow-[2px_2px_0px_0px_#000]">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Target size={15} className="text-rose-600" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs text-zinc-700 leading-relaxed font-medium">
              {project.problemStatement || project.description}
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-lg border-2 border-black bg-sky-50 shadow-[2px_2px_0px_0px_#000]">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <Layers size={15} className="text-sky-700" />
              <span>Solution & Technical Architecture</span>
            </div>
            <p className="text-xs text-zinc-800 leading-relaxed font-medium">
              {project.architectureSolution || 'Implemented responsive modular architecture with clean component boundaries.'}
            </p>
          </div>

          {project.keyMetrics && project.keyMetrics.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
                <TrendingUp size={15} className="text-emerald-600" />
                <span>Verified Impact & Metrics</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {project.keyMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg border-2 border-black bg-emerald-100 text-emerald-950 text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5"
                  >
                    <Check size={13} className="text-emerald-800 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 pt-2 border-t-2 border-black/10">
            <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase">Production Stack:</span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded border border-black bg-zinc-100 text-black font-semibold shadow-[1px_1px_0px_0px_#000]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-zinc-100 border-t-2 border-black flex items-center justify-end gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('github_click', project.title)}
              className="brutal-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-zinc-50 text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              <Github size={14} /> GitHub Code
            </a>
          )}
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('demo_click', project.title)}
              className="brutal-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-300 hover:bg-sky-400 text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              Live Production <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
