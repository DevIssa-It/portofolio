'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Collaborator / Mentor',
    role: 'Tech Lead',
    company: 'CV Koding Data Artifisial',
    content: 'Issa has exceptional attention to clean code, modular architecture, and rapid feature delivery during his internship.',
    rating: 5,
    avatar: 'KD',
  },
  {
    id: 2,
    name: 'Project Partner',
    role: 'Frontend Developer',
    company: 'Universitas Brawijaya',
    content: 'Highly proactive in building complex web apps with Next.js, state management, and modern component design.',
    rating: 5,
    avatar: 'UB',
  },
  {
    id: 3,
    name: 'Open Source Peer',
    role: 'Software Engineer',
    company: 'Community Contributor',
    content: 'Impressive dedication to clean APIs, comprehensive TypeScript typing, and rock-solid test coverage.',
    rating: 5,
    avatar: 'OS',
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      let next = prev + newDirection
      if (next < 0) next = TESTIMONIALS.length - 1
      if (next >= TESTIMONIALS.length) next = 0
      return next
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [paginate])

  const t = TESTIMONIALS[currentIndex]

  return (
    <section className="py-20 px-6 bg-white border-b-2 border-black">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="brutal-badge bg-sky-300 text-black px-2.5 py-0.5 text-xs font-mono font-bold uppercase">
            {'// Endorsements'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-mono text-black uppercase">
            Peer & Mentorship Feedback
          </h2>
        </div>

        <div className="relative brutal-card bg-[#f8fafc] border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 text-center"
            >
              <div className="flex justify-center gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <FiStar key={i} className="text-sky-500 fill-sky-400" size={18} />
                ))}
              </div>
              <p className="text-base sm:text-lg font-mono text-black font-medium leading-relaxed max-w-2xl mx-auto">
                &ldquo;{t.content}&rdquo;
              </p>
              <div>
                <h3 className="font-mono text-sm font-black text-black uppercase">{t.name}</h3>
                <p className="font-mono text-xs text-zinc-600">{t.role} &bull; {t.company}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6 pt-6 border-t-2 border-black/10">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => paginate(-1)}
              className="brutal-btn p-2 rounded-md bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                  className={`h-2 rounded-full transition-all border border-black ${i === currentIndex ? 'w-6 bg-black' : 'w-2 bg-zinc-300'}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => paginate(1)}
              className="brutal-btn p-2 rounded-md bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"
              aria-label="Next testimonial"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
