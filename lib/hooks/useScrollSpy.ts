import { useState, useEffect } from 'react'

/**
 * Custom hook to track the active section in the viewport using IntersectionObserver.
 * Replaces window.scrollY / scroll event listeners to prevent React state churn.
 */
export function useScrollSpy(sectionIds: string[], offsetRatio = 0.3): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '')

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: `-${Math.round(offsetRatio * 100)}% 0px -40% 0px`,
        threshold: 0,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds, offsetRatio])

  return activeId
}
