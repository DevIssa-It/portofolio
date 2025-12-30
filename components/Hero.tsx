'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const texts = ['Frontend Developer', 'React Developer', 'Vue.js Developer']
  const typingSpeed = 100
  const deletingSpeed = 50
  const pauseTime = 2000
  
  useEffect(() => {
    const handleType = () => {
      const current = loopNum % texts.length
      const fullText = texts[current]
      
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      )
      
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }
    
    const timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum])
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative px-6">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Available for hire</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-bold text-white leading-[1] tracking-tighter mb-8"
          >
            {text}<span className="animate-pulse">|</span> <br />
            <span className="text-zinc-600">Aspiring Fullstack.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-12"
          >
            Information Technology student focused on modern web development with React.js and Vue.js. Building responsive, user-centric interfaces while expanding backend skills.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <a href="#projects" className="flex items-center gap-2 text-primary border-b border-primary/50 pb-0.5 hover:text-white hover:border-white transition-all">
                <ArrowUpRight size={20} /> View Projects
              </a>
              <a 
                href="/resume.pdf" 
                download
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-full border border-zinc-800 hover:border-primary/50 transition-all"
              >
                <Download size={18} /> Resume
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/DevIssa-It" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                <Github size={20} /> GitHub
              </a>
              <a href="https://linkedin.com/in/a-issadurrofiq-jaya-utama-6b559228a" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                <Linkedin size={20} /> LinkedIn
              </a>
              <a href="mailto:ahmadissadurrofiq17@gmail.com" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                <Mail size={20} /> Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
