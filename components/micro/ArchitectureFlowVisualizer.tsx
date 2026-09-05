'use client'

import { useState } from 'react'
import { Globe, ShieldCheck, Server, Database, ArrowRight, Cpu } from 'lucide-react'
import { Project } from '@/types/project'

interface ArchitectureFlowVisualizerProps {
  project: Project
}

interface FlowNode {
  id: string
  label: string
  detail: string
  icon: typeof Globe
  tag: string
}

export default function ArchitectureFlowVisualizer({ project }: ArchitectureFlowVisualizerProps) {
  const defaultNodes: FlowNode[] = [
    {
      id: 'client',
      label: 'Client Browser',
      detail: 'Next.js 14 Client Components with reactive UI, dark-mode tokens, and optimistic updates.',
      icon: Globe,
      tag: 'Presentation',
    },
    {
      id: 'edge',
      label: 'Edge Middleware',
      detail: 'Request routing, NextAuth session token verification, and security headers enforcement.',
      icon: ShieldCheck,
      tag: 'Security & Auth',
    },
    {
      id: 'service',
      label: 'App Router API',
      detail: 'Typed REST handlers, business validation, repository mediation, and webhook dispatch.',
      icon: Server,
      tag: 'Domain Service',
    },
    {
      id: 'db',
      label: 'Neon Serverless DB',
      detail: 'PostgreSQL storage with resilient offline JSON fallbacks and idempotent upsert queries.',
      icon: Database,
      tag: 'Persistence',
    },
  ]

  const nodes: FlowNode[] = project.architectureNodes?.length
    ? project.architectureNodes.map((n, idx) => ({
        id: n.id,
        label: n.label,
        detail: n.detail,
        icon: idx === 0 ? Globe : idx === 1 ? ShieldCheck : idx === 2 ? Cpu : Database,
        tag: n.type.toUpperCase(),
      }))
    : defaultNodes

  const [activeNodeId, setActiveNodeId] = useState<string>(nodes[0]?.id || 'client')
  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0]

  return (
    <div className="space-y-3 p-4 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-black uppercase text-black flex items-center gap-1.5">
          <Cpu size={14} className="text-sky-700" />
          <span>Interactive Architecture Pipeline</span>
        </span>
        <span className="text-[10px] font-mono text-zinc-700 uppercase font-bold">Click step to inspect</span>
      </div>

      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 pt-1">
        {nodes.map((node, index) => {
          const Icon = node.icon
          const isActive = node.id === activeNodeId
          return (
            <div key={node.id} className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={`p-2 rounded-md border-2 font-mono text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-black bg-sky-200 shadow-[2px_2px_0px_0px_#000]'
                    : 'border-black/30 bg-zinc-50 hover:bg-zinc-100 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={12} className={isActive ? 'text-black' : 'text-zinc-800'} />
                  <span className="text-[10px] uppercase font-bold text-zinc-700">{node.tag}</span>
                </div>
                <div className="text-xs font-black text-black whitespace-nowrap">{node.label}</div>
              </button>
              {index < nodes.length - 1 && (
                <ArrowRight size={14} className="text-zinc-600 shrink-0 mx-0.5" />
              )}
            </div>
          )
        })}
      </div>

      {activeNode && (
        <div className="p-2.5 rounded bg-zinc-100 border border-black/20 text-xs font-mono">
          <span className="font-black text-black mr-2">[{activeNode.label}]:</span>
          <span className="text-zinc-750 font-medium">{activeNode.detail}</span>
        </div>
      )}
    </div>
  )
}
