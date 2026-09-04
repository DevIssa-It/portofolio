'use client'

import { Layout, Server, Wrench } from 'lucide-react'

const CAPABILITY_LAYERS = [
  {
    layer: '01',
    category: 'Client & Interface Systems',
    summary: 'Building state-driven, reactive user interfaces with strict type safety and sub-second load times.',
    skills: ['React.js', 'Next.js 14', 'Vue.js 3', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    competencies: ['Component Systems', 'Deterministic State', 'WCAG Accessibility', 'Client Caching'],
  },
  {
    layer: '02',
    category: 'Backend Architecture & Data',
    summary: 'Designing maintainable API contracts, serverless database interactions, and secure authentication.',
    skills: ['Node.js', 'Laravel', 'Neon PostgreSQL', 'MySQL', 'MongoDB', 'NextAuth'],
    competencies: ['RESTful API Design', 'Relational Modeling', 'Serverless Drivers', 'Session Security'],
  },
  {
    layer: '03',
    category: 'Toolchain, Testing & Quality',
    summary: 'Employing automated testing routines, continuous integration, and disciplined version control.',
    skills: ['Git / GitHub', 'Vercel CI', 'Postman', 'Unit Testing', 'Vite', 'ESLint'],
    competencies: ['Automated Deploys', 'API Contract Testing', 'Code Reviews', 'Bundle Optimization'],
  },
]

export default function TechCapabilities() {
  return (
    <section id="capabilities" className="py-20 px-6 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="border-b border-zinc-200 pb-4 space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
            // 03. Technical Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Architectural Layers & Production Stack
          </h2>
        </div>

        {/* Stack Layers Ledger */}
        <div className="space-y-6">
          {CAPABILITY_LAYERS.map((layer) => (
            <div
              key={layer.layer}
              className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 hover:border-zinc-300 transition-colors shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Layer index & Title */}
                <div className="lg:col-span-4 space-y-2">
                  <span className="font-mono text-xs font-bold text-zinc-400">
                    LAYER {layer.layer}
                  </span>
                  <h3 className="text-xl font-bold text-zinc-950">{layer.category}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{layer.summary}</p>
                </div>

                {/* Right: Technologies & Competencies */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 block mb-2 font-semibold">
                      Primary Technologies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {layer.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-800 font-mono text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 font-sans">
                    <span className="font-mono text-[11px] text-zinc-400">Core Practices:</span>
                    {layer.competencies.map((comp) => (
                      <span key={comp} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span>{comp}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
