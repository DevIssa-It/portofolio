import { ArrowUpRight, Github, BookOpen } from "lucide-react"
import { ProjectImage } from "@/components/micro/ProjectImage"
import { useAnalyticsTracker } from "@/lib/hooks/useAnalyticsTracker"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  createdAt?: string
  onViewCaseStudy?: () => void
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  tags,
  liveUrl,
  githubUrl,
  createdAt,
  onViewCaseStudy,
}: ProjectCardProps) {
  const { trackEvent } = useAnalyticsTracker()
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <article className="brutal-card brutal-card-hover bg-white overflow-hidden flex flex-col h-full">
      {/* Card Header & Image */}
      <div className="w-full h-44 overflow-hidden relative border-b-2 border-black bg-zinc-100">
        <ProjectImage
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />

        {/* Tags on Top Left */}
        {tags && tags.length > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="brutal-badge text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-200 text-black"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Repo Creation Date Badge on Top Right */}
        {formattedDate && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="brutal-badge text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-bold shadow-[1px_1px_0px_0px_#000]">
              {formattedDate}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-black text-black">
            {title}
          </h3>

          <p className="text-zinc-700 text-xs leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="pt-3 border-t-2 border-black/10 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded border border-black bg-zinc-100 text-black font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            {onViewCaseStudy && (
              <button
                type="button"
                onClick={onViewCaseStudy}
                className="brutal-btn bg-white hover:bg-sky-50 text-black py-1.5 px-2.5 rounded text-xs flex items-center justify-center gap-1 font-mono font-bold"
                title="View project case study & architecture"
              >
                <BookOpen size={13} />
                <span>Case Study</span>
              </button>
            )}

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('demo_click', title)}
                aria-label={`Live demo for ${title}`}
                className="brutal-btn flex-1 bg-sky-300 hover:bg-sky-400 text-black py-1.5 px-3 rounded text-xs flex items-center justify-center gap-1.5 font-bold"
              >
                Live Demo <ArrowUpRight size={14} />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('github_click', title)}
                className="brutal-btn bg-white hover:bg-zinc-100 text-black p-1.5 rounded"
                aria-label={`GitHub repo for ${title}`}
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}