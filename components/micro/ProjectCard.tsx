import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Github } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies, 
  tags,
  liveUrl, 
  githubUrl
}: ProjectCardProps) {
  return (
    <Card className="group relative rounded-xl border-zinc-800 bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:border-primary hover:bg-zinc-900 hover:-translate-y-1">
      {/* Image Section */}
      <div className="w-full h-48 overflow-hidden border-b border-zinc-800/50 relative">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
        
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full h-full object-cover transform transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {tags.map((tag, i) => (
            <Badge key={i} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/90 text-primary backdrop-blur-md border-primary/30">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-4">
          <CardTitle className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <div className="flex gap-2">
            {githubUrl && (
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-zinc-700 text-zinc-500 transition-all duration-300 hover:text-white hover:border-white hover:bg-white hover:text-black hover:scale-110"
                asChild
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={18} />
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-zinc-700 text-zinc-500 transition-all duration-300 hover:text-primary hover:border-primary hover:rotate-45 hover:!bg-white hover:!text-black hover:!border-white hover:!scale-110"
                asChild
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight size={20} />
                </a>
              </Button>
            )}
          </div>
        </div>
        
        <CardDescription className="text-zinc-400 leading-relaxed text-sm mb-6 min-h-[60px]">
          {description}
        </CardDescription>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/50">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="px-3 py-1.5 text-[11px] font-medium bg-zinc-800/50 text-zinc-400 border-zinc-700/50 group-hover:border-primary/30 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}