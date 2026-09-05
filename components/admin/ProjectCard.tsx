'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, ExternalLink, Github } from 'lucide-react'
import { ProjectImage } from '@/components/micro/ProjectImage'
import { motion } from 'framer-motion'

import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const formattedDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      className="brutal-card brutal-card-hover bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl overflow-hidden flex flex-col h-full"
    >
      {/* Image Preview */}
      <div className="relative h-44 w-full overflow-hidden border-b-2 border-black bg-zinc-100">
        <ProjectImage
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
        />

        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          {project.category && (
            <span className="brutal-badge text-[10px] font-mono px-2 py-0.5 rounded bg-sky-200 text-black font-bold border border-black shadow-[1px_1px_0px_0px_#000]">
              {project.category}
            </span>
          )}
          {project.featured && (
            <span className="brutal-badge text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-300 text-black font-black border border-black shadow-[1px_1px_0px_0px_#000]">
              Featured
            </span>
          )}
          {formattedDate && (
            <span className="brutal-badge text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-bold shadow-[1px_1px_0px_0px_#000]">
              {formattedDate}
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-base font-black text-black leading-snug line-clamp-1">
            {project.title}
          </h3>
          <p className="text-zinc-600 text-xs line-clamp-2 leading-relaxed font-medium">
            {project.description}
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t-2 border-black/10">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded border border-black bg-zinc-100 text-black font-semibold"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-black bg-white text-zinc-600 font-semibold">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="brutal-btn flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-sky-100 hover:bg-sky-200 text-black border-2 border-black text-xs font-mono font-bold"
            >
              <Edit size={13} />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => onDelete(project.id)}
              className="brutal-btn flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-red-100 hover:bg-red-200 text-red-900 border-2 border-black text-xs font-mono font-bold"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
