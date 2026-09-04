'use client'

import { useState } from 'react'
import Image from 'next/image'
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
  fallbackIconSize = 36,
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false)

  const isInvalidSrc = !src || src.trim() === '' || src === '#'

  if (isInvalidSrc || hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 border-b-2 border-black select-none">
        <div className="w-12 h-12 rounded-lg bg-white border-2 border-black flex items-center justify-center mb-1 shadow-[2px_2px_0px_0px_#000]">
          <FolderGit2
            size={fallbackIconSize}
            className="text-black"
          />
        </div>
        <span className="text-xs font-mono font-bold text-black uppercase tracking-wider px-3 text-center line-clamp-1">
          {alt || 'Repository'}
        </span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setHasError(true)}
        className="object-cover object-center"
        loading="lazy"
      />
    </div>
  )
}
