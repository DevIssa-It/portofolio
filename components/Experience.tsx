'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { Section } from '@/components/micro/Section'
import { getExperience, Experience as ExperienceType } from '@/lib/services/experience.service'

export default function Experience() {
  const [experience, setExperience] = useState<ExperienceType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadExperience()
  }, [])

  const loadExperience = async () => {
    try {
      const result = await getExperience()
      if (result.success && result.data) {
        setExperience(result.data)
      }
    } catch (error) {
      console.error('Error loading experience:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Section id="experience" className="border-t border-zinc-900">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Section>
    )
  }

  return (
    <Section id="experience" className="border-t border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="col-span-1 sticky top-32">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed">
            Professional experience in web development and team collaboration.
          </p>
        </div>
        
        <div className="col-span-1 md:col-span-2 space-y-16">
          {experience.map((exp, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative pl-8 border-l border-zinc-800 hover:border-primary transition-colors"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-primary transition-colors shadow-[0_0_0_4px_black]"></div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{exp.company}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <span className="text-primary text-base font-medium flex items-center gap-2">
                  <Briefcase size={14} />
                  {exp.role}
                </span>
                <span className="hidden sm:inline text-zinc-700 text-sm">•</span>
                <span className="text-zinc-500 text-sm font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">{exp.year}</span>
              </div>
              <p className="text-zinc-400 text-base leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl hover:border-primary/30 transition-colors"
          >
            <h4 className="text-lg font-bold text-white mb-3">Currently Looking For</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Seeking internship or junior position as Frontend Developer or Fullstack Developer to develop skills and contribute to innovative projects.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}