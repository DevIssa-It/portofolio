import { useState, useEffect } from 'react'

/**
 * Custom hook to track the active section in the viewport using IntersectionObserver.
 * Includes a scroll listener to reliably lock to the top section when at the page top.
 */
export function useScrollSpy(sectionIds: string[], offsetRatio = 0.25): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '')
  const serializedSectionIds = sectionIds.join(',')

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveId(sectionIds[0])
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 120) {
          setActiveId(sectionIds[0])
          return
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: `-${Math.round(offsetRatio * 100)}% 0px -40% 0px`,
        threshold: 0.1,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serializedSectionIds, offsetRatio])

  return activeId
}
