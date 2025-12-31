'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { Section } from '@/components/micro/Section'
import { getEducation, Education as EducationType } from '@/lib/services/education.service'

export default function Education() {
  const [education, setEducation] = useState<EducationType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEducation()
  }, [])

  const loadEducation = async () => {
    try {
      const result = await getEducation()
      if (result.success && result.data) {
        setEducation(result.data)
      }
    } catch (error) {
      console.error('Error loading education:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Section id="education" className="border-t border-zinc-900">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Section>
    )
  }

  return (
    <Section id="education" className="border-t border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="col-span-1">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Education
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed">
            Academic foundation shaping technical understanding in software development.
          </p>
        </div>
        
        <div className="col-span-1 md:col-span-2 space-y-16">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative pl-8 border-l border-zinc-800 hover:border-primary transition-colors"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-primary transition-colors shadow-[0_0_0_4px_black]"></div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{edu.school}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary text-base font-medium flex items-center gap-2">
                  <GraduationCap size={16} />
                  {edu.degree}
                </span>
                <span className="text-zinc-600 text-sm">•</span>
                <span className="text-zinc-500 text-base font-mono">{edu.year}</span>
              </div>
              <p className="text-zinc-400 text-base max-w-lg leading-relaxed">
                {edu.description}
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
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Location
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              <strong className="text-white">Malang, East Java</strong> - Active in local tech community and open to remote or hybrid work opportunities.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}