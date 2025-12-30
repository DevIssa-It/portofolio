'use client'
import { motion } from 'framer-motion'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiGit,
  SiLaravel,
  SiVuedotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiFirebase,
  SiAndroidstudio,
  SiPostman,
  SiXampp
} from 'react-icons/si'
import { Section } from '@/components/micro/Section'
import { SectionTitle } from '@/components/micro/SectionTitle'
import { SkillCard } from '@/components/micro/SkillCard'

export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend Development',
      skills: [
        { name: 'React.js', icon: <SiReact style={{ color: '#61DAFB' }} /> },
        { name: 'Vue.js', icon: <SiVuedotjs style={{ color: '#4FC08D' }} /> },
        { name: 'JavaScript', icon: <SiJavascript style={{ color: '#F7DF1E' }} /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss style={{ color: '#06B6D4' }} /> },
        { name: 'HTML5', icon: <SiHtml5 style={{ color: '#E34F26' }} /> },
        { name: 'CSS3', icon: <SiCss3 style={{ color: '#1572B6' }} /> },
      ],
    },
    {
      category: 'Backend Development',
      skills: [
        { name: 'Laravel', icon: <SiLaravel style={{ color: '#FF2D20' }} /> },
        { name: 'Node.js', icon: <SiNodedotjs style={{ color: '#339933' }} /> },
        { name: 'Express.js', icon: <SiExpress style={{ color: '#000000' }} /> },
      ],
    },
    {
      category: 'Database & Tools',
      skills: [
        { name: 'MySQL', icon: <SiMysql style={{ color: '#4479A1' }} /> },
        { name: 'MongoDB', icon: <SiMongodb style={{ color: '#47A248' }} /> },
        { name: 'Firebase', icon: <SiFirebase style={{ color: '#FFCA28' }} /> },
        { name: 'Git/GitHub', icon: <SiGit style={{ color: '#F05032' }} /> },
        { name: 'XAMPP', icon: <SiXampp style={{ color: '#FB7A24' }} /> },
        { name: 'Postman', icon: <SiPostman style={{ color: '#FF6C37' }} /> },
      ],
    },
    {
      category: 'Mobile Development',
      skills: [
        { name: 'Android Studio', icon: <SiAndroidstudio style={{ color: '#3DDC84' }} /> },
      ],
    },
  ]

  return (
    <Section id="skills" className="bg-muted/50">
      <div className="w-full flex flex-col justify-center">
        <SectionTitle subtitle="Technologies and tools I use based on my experience and projects">
          Skills & Technologies
        </SectionTitle>

        <div className="space-y-16 flex-1">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.category}>
              <h3 className="text-2xl font-semibold mb-8 text-center">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <SkillCard
                      icon={skill.icon}
                      name={skill.name}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
