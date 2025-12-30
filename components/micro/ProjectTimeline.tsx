import { motion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
}

interface ProjectTimelineProps {
  projects: Project[]
}

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
      
      <div className="space-y-24">
        {projects.map((project, index) => (
          <div key={project.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
            
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`w-full max-w-4xl ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  liveUrl={project.demo}
                  githubUrl={project.github}
                  isReversed={index % 2 !== 0}
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}