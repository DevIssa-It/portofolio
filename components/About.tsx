'use client'

import { Code2, MapPin, Globe } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-20 px-6 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
            About the Developer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Engineering with focus on performance, clarity, and reliability.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Narrative Card */}
          <div className="md:col-span-2 bg-white rounded-2xl p-7 sm:p-8 space-y-5 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <Code2 className="text-slate-800" size={20} />
              Technical Background
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              I am pursuing a Bachelor of Computer Science at Brawijaya University with a core focus on software engineering. Over the past few years, my primary dedication has been creating modular, performant user interfaces with React, Next.js, and Vue.js while expanding fullstack backend knowledge.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              During my frontend internship with Rakamin Academy and Core Initiative, I built component-driven web applications with end-to-end unit testing and automated deployments, scoring 87.7/100 for technical precision and agile team collaboration.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {['Clean Architecture', 'Accessible Web', 'Modular Components', 'REST Integration', 'Automated Testing'].map((item) => (
                <span key={item} className="text-xs font-mono px-3 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Side Info Bento */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 space-y-3 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="text-slate-700" size={16} /> Location
              </h4>
              <p className="text-slate-800 font-medium text-sm">Malang, East Java, Indonesia</p>
              <p className="text-slate-500 text-xs">Available for remote, hybrid, or on-site opportunities.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 space-y-3 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Globe className="text-slate-700" size={16} /> Languages
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Indonesian</span>
                  <span className="text-slate-500 font-mono">Native</span>
                </div>
                <div className="flex justify-between">
                  <span>English</span>
                  <span className="text-slate-500 font-mono">Working Proficiency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}