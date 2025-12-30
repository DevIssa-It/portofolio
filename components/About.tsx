'use client'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { Section } from '@/components/micro/Section'

export default function About() {
  return (
    <Section id="about" className="border-t border-zinc-900">
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Column: Title & Intro */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              About Me
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                I'm <span className="text-white font-medium">A. Issadurrofiq Jaya Utama</span>, an Information Technology student at Brawijaya University with a deep passion for <span className="text-white font-medium">modern web development</span>.
              </p>
              <p>
                My focus is on <span className="text-white font-medium">Frontend Development</span> using React.js and Vue.js, with backend capabilities in Laravel and Node.js. I'm committed to creating innovative and scalable digital solutions, working towards becoming a <span className="text-white font-medium">Fullstack Developer</span>.
              </p>
              <p>
                Experienced in building web applications with a <span className="text-white font-medium">user-centric design</span> approach, focusing on performance, usability, and optimal user experience.
              </p>
            </div>
            
            <div className="mt-8 flex gap-4">
              <div className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h4 className="text-primary font-bold text-2xl mb-1">2025</h4>
                <span className="text-zinc-500 text-xs uppercase tracking-wider">Expected Graduate</span>
              </div>
              <div className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h4 className="text-primary font-bold text-2xl mb-1">3+</h4>
                <span className="text-zinc-500 text-xs uppercase tracking-wider">Major Projects</span>
              </div>
            </div>
          </div>

          {/* Right Column: Skills / Philosophy */}
          <div className="flex-1 w-full">
            <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl hover:border-primary/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User size={20} className="text-primary" />
                My Approach
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                  <p className="text-zinc-400 text-sm">Focus on performance and usability in every application I build.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                  <p className="text-zinc-400 text-sm">Prioritize clean code and best practices for long-term maintainability.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                  <p className="text-zinc-400 text-sm">Always learning new technologies and following web development industry trends.</p>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 bg-zinc-900/20 border border-zinc-800 p-6 rounded-2xl">
              <h4 className="text-lg font-bold text-white mb-4">Information</h4>
              <div className="space-y-2 text-sm text-zinc-400">
                <p><span className="text-white">Location:</span> Malang, East Java</p>
                <p><span className="text-white">Languages:</span> Indonesian (Native), English (Limited Working)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}