'use client'

import { useState } from 'react'
import { FolderGit2 } from 'lucide-react'

interface ProjectImageProps {
  src?: string | null
  alt: string
  className?: string
  fallbackIconSize?: number
}

export function ProjectImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackIconSize = 36,
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false)

  const isInvalidSrc = !src || src.trim() === '' || src === '#'

  if (isInvalidSrc || hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border-b border-zinc-800/40 select-none">
        <div className="w-14 h-14 rounded-xl bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center mb-2 shadow-inner">
          <FolderGit2
            size={fallbackIconSize}
            className="text-zinc-500 group-hover:text-primary transition-colors"
          />
        </div>
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest px-3 text-center line-clamp-1">
          {alt || 'Repository'}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  )
}
