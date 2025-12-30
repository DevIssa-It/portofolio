'use client'
import { motion } from 'framer-motion'
import {
  SiReact,
  SiVuedotjs,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiGit,
  SiLaravel,
  SiFirebase,
  SiNextdotjs,
  SiTypescript,
} from 'react-icons/si'
import { Section } from '@/components/micro/Section'

export default function TechStackScroll() {
  const techLogos = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "Git", icon: SiGit, color: "#F05032" },
  ]

  return (
    <Section id="stack" className="border-t border-zinc-900">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-4">
          Tech Stack
        </h2>
        <p className="text-zinc-500 text-sm max-w-md text-right hidden md:block">
          Technologies I use in my projects and development work.
        </p>
      </div>

      <div className="relative w-full overflow-hidden bg-zinc-900/20 rounded-2xl border border-zinc-800 py-24">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
        
        <div className="flex w-[200%] animate-scroll hover:pause">
          <div className="flex w-1/2 justify-around items-center px-4">
            {techLogos.map((tech, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group relative">
                <div className="relative p-2 transition-all duration-300 transform group-hover:scale-110">
                  <div 
                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: tech.color }}
                  ></div>
                  <tech.icon 
                    size={64}
                    className="opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    style={{ color: tech.color }}
                  />
                </div>
                <span 
                  className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-8 font-bold tracking-wider"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex w-1/2 justify-around items-center px-4">
            {techLogos.map((tech, i) => (
              <div key={`d-${i}`} className="flex flex-col items-center gap-4 group relative">
                <div className="relative p-2 transition-all duration-300 transform group-hover:scale-110">
                  <div 
                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: tech.color }}
                  ></div>
                  <tech.icon 
                    size={64}
                    className="opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    style={{ color: tech.color }}
                  />
                </div>
                <span 
                  className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-8 font-bold tracking-wider"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}