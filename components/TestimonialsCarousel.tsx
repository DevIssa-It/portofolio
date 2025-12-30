'use client'
import { useState, useEffect } from 'react'
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

export default function TestimonialsCarousel() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO',
      company: 'Tech Company',
      content: 'Working with this developer was an absolute pleasure. The attention to detail and code quality is outstanding!',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Product Manager',
      company: 'Startup Inc',
      content: 'Delivered ahead of schedule and exceeded all expectations. Highly recommended for any web development project!',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'CTO',
      company: 'Digital Agency',
      content: 'Exceptional technical skills combined with great communication. A true professional who delivers results.',
      rating: 5,
      avatar: '👨‍💻',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 4000) // Slide every 4 seconds

    return () => clearInterval(timer)
  }, [currentIndex])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = testimonials.length - 1
      if (nextIndex >= testimonials.length) nextIndex = 0
      return nextIndex
    })
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Don't just take my word for it - hear what clients have to say
          </p>

          {/* Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-xl"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={24} />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 italic">
                    "{testimonials[currentIndex].content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-5xl">{testimonials[currentIndex].avatar}</div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-gray-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow hover:bg-gray-50"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={24} className="text-gray-700" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow hover:bg-gray-50"
              aria-label="Next testimonial"
            >
              <FiChevronRight size={24} className="text-gray-700" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
