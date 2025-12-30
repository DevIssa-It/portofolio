'use client'
import { motion } from 'framer-motion'
import { SiReact, SiNextdotjs, SiVuedotjs, SiJavascript, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiLaravel, SiMysql, SiMongodb, SiFirebase, SiGit, SiAndroidstudio } from 'react-icons/si'

export default function InfiniteScroll() {
  const technologies = [
    { icon: SiReact, name: 'React.js', color: '#61DAFB' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
    { icon: SiVuedotjs, name: 'Vue.js', color: '#4FC08D' },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiExpress, name: 'Express.js', color: '#000000' },
    { icon: SiLaravel, name: 'Laravel', color: '#FF2D20' },
    { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
    { icon: SiGit, name: 'Git', color: '#F05032' },
    { icon: SiAndroidstudio, name: 'Android Studio', color: '#3DDC84' },
  ]

  // Duplicate technologies for seamless loop
  const duplicatedTechnologies = [...technologies, ...technologies]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technologies I Use
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Constantly learning and working with modern technologies to build amazing applications
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-indigo-100 to-transparent z-10" />

        <motion.div
          className="flex gap-8"
          animate={{
            x: [0, -50 * technologies.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTechnologies.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 w-32 h-32 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 group"
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon 
                  size={48} 
                  style={{ color: tech.color }}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Second Row - Reverse Direction */}
      <div className="relative mt-8">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-indigo-100 to-transparent z-10" />

        <motion.div
          className="flex gap-8"
          animate={{
            x: [-50 * technologies.length, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTechnologies.reverse().map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={`${tech.name}-reverse-${index}`}
                className="flex-shrink-0 w-32 h-32 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 group"
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon 
                  size={48} 
                  style={{ color: tech.color }}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
