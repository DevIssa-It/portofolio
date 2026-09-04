'use client'

import { useState, useEffect } from 'react'
import { Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react'
import { getExperience, Experience } from '@/lib/services/experience.service'
import { getEducation, Education } from '@/lib/services/education.service'

export default function Journey() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])

  useEffect(() => {
    async function loadData() {
      const [expRes, eduRes] = await Promise.all([getExperience(), getEducation()])
      if (expRes.success && expRes.data) setExperience(expRes.data)
      if (eduRes.success && eduRes.data) setEducation(eduRes.data)
    }
    loadData()
  }, [])

  return (
    <section id="journey" className="py-20 px-6 border-t-2 border-black bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-2 border-b-2 border-black/10 pb-4">
          <span className="brutal-badge inline-block bg-orange-300 text-black px-3 py-1 text-xs uppercase tracking-wider font-mono">
            // 03. Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
            Experience & Education Journey
          </h2>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Work Experience */}
          <div className="space-y-5">
            <h3 className="font-mono text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
              <Briefcase size={16} /> Production Track
            </h3>

            {experience.map((item, idx) => (
              <div
                key={item.id}
                className={`brutal-card p-6 space-y-3 ${
                  idx === 0 ? 'bg-sky-100/80' : 'bg-emerald-100/70'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="text-lg font-black text-black">{item.role}</h4>
                    <p className="text-xs font-bold text-zinc-700">{item.company}</p>
                  </div>
                  <span className="brutal-badge bg-white text-black text-xs font-mono px-2.5 py-0.5 shrink-0">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs text-zinc-800 leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {item.company.toLowerCase().includes('koding') ? (
                    <>
                      <span className="brutal-badge bg-white text-black text-[10px] font-mono px-2 py-0.5">Next.js 15 App Router</span>
                      <span className="brutal-badge bg-white text-black text-[10px] font-mono px-2 py-0.5">React 19 & TypeScript</span>
                      <span className="brutal-badge bg-white text-black text-[10px] font-mono px-2 py-0.5">Jest & MSW</span>
                    </>
                  ) : (
                    <>
                      <span className="brutal-badge bg-emerald-300 text-black text-[10px] font-mono px-2 py-0.5 font-bold">Grade: 87.7 / 100 (Excellent)</span>
                      <span className="brutal-badge bg-white text-black text-[10px] font-mono px-2 py-0.5">Vue.js & CI/CD</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Academic & Certifications */}
          <div className="space-y-5">
            <h3 className="font-mono text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
              <GraduationCap size={17} /> Academic & Certifications
            </h3>

            {education.map((item) => (
              <div
                key={item.id}
                className="brutal-card bg-white p-6 space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="text-lg font-black text-black">{item.degree}</h4>
                    <p className="text-xs font-bold text-zinc-700">{item.school}</p>
                  </div>
                  <span className="brutal-badge bg-white text-black text-xs font-mono px-2.5 py-0.5 shrink-0">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs text-zinc-800 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Certifications Card */}
            <div className="brutal-card bg-orange-50 p-5 space-y-3">
              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                <Award size={15} /> Verified Certifications
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-black block">Core Initiative Frontend Project-Based Internship</span>
                    <span className="text-[11px] font-mono text-zinc-600">ID: 351201IAPAGIC2492025 • Sep 2025</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-black block">Agile Scrum Fundamentals (ASF)</span>
                    <span className="text-[11px] font-mono text-zinc-600">MindMagine • May 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability & Languages */}
            <div className="brutal-card bg-emerald-100 p-4 text-xs font-mono text-black space-y-1">
              <span className="font-bold block">Status & Languages:</span>
              <p className="text-zinc-800">
                Active Computer Science undergraduate at Universitas Brawijaya. Indonesian (Native), English (Limited Working). Open for Full-Stack & Frontend opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
