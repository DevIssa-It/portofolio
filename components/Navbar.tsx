'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Detect active section
      const sections = ['home', 'about', 'projects', 'stack', 'experience', 'education', 'contact']
      
      // Special handling for contact (check if we're near bottom)
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      if (isNearBottom) {
        setActiveSection('contact')
        return
      }
      
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    
    handleScroll() // Call immediately on mount
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Stack', href: '#stack' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
      <div className="flex items-center justify-between gap-24 p-2 pl-2 pr-6 bg-black/90 backdrop-blur-sm border border-zinc-800 rounded-full shadow-2xl">
        {/* Left: Home Button */}
        <a
          href="#home"
          onClick={(e) => smoothScroll(e, '#home')}
          className="bg-primary hover:bg-primary/90 text-black font-bold text-xs px-6 py-2.5 rounded-full transition-all uppercase tracking-wider"
        >
          Home
        </a>
        
        {/* Right: Nav Links */}
        <div className="flex items-center gap-1 whitespace-nowrap relative">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              className={cn(
                "text-xs font-bold transition-colors capitalize relative z-10 px-6 py-2.5 uppercase tracking-wider",
                activeSection === link.href.slice(1)
                  ? "text-white"
                  : "text-zinc-500 hover:text-primary"
              )}
            >
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
