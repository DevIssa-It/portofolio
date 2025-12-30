'use client'
import { useState, useEffect } from 'react'
import { Mail, Send, Loader2, Linkedin, Github } from 'lucide-react'
import VisitorCounter from './VisitorCounter'

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle')
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    }
    
    // TODO: Replace with your EmailJS credentials or API endpoint
    // For now, simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Form data:', data)
      setFormStatus('success')
      e.currentTarget.reset()
      setTimeout(() => setFormStatus('idle'), 3000)
    } catch (error) {
      setFormStatus('idle')
      alert('Failed to send message. Please try again.')
    }
  }

  return (
    <>
      <section id="contact" className="min-h-[90vh] flex flex-col justify-end pb-6">
        {/* Content Wrapper */}
        <div className="border-t border-zinc-800 pt-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left: Heading & Socials */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight">
                    Have an idea? <br/>
                    <span className="text-zinc-600">Let's build it.</span>
                  </h2>
                  <p className="text-zinc-400 text-lg max-w-md mb-8">
                    I'm currently available for freelance work and collaboration. Let's discuss how we can work together.
                  </p>
                  
                  <div className="flex gap-6 mt-auto">
                    <a href="https://linkedin.com/in/a-issadurrofiq-jaya-utama-6b559228a" className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors">
                      <Linkedin size={20} /> LinkedIn
                    </a>
                    <a href="https://github.com/DevIssa-It" className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors">
                      <Github size={20} /> GitHub
                    </a>
                    <a href="mailto:ahmadissadurrofiq17@gmail.com" className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors">
                      <Mail size={20} /> Email
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: CONTACT FORM */}
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-white placeholder:text-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="Your Name"
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-white placeholder:text-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="name@example.com"
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-white placeholder:text-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                      placeholder="Tell me about your project..."
                      required 
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-primary hover:bg-white text-black font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Sending...
                      </>
                    ) : formStatus === 'success' ? (
                      'Message Sent!'
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Separate Section */}
      <footer className="min-h-[10vh] flex items-center border-t border-zinc-800 px-6">
        <div className="container mx-auto max-w-7xl w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-8">
              <div className="text-zinc-600 text-xs">
                LOCAL TIME <br/>
                <span className="text-zinc-400 font-mono">{time}</span>
              </div>
              <div className="text-zinc-600 text-xs">
                STATUS <br/>
                <span className="text-primary animate-pulse">●</span> <span className="text-zinc-400">Available</span>
              </div>
              <div className="text-zinc-600 text-xs hidden md:block">
                VISITORS <br/>
                <VisitorCounter />
              </div>
            </div>

            <div className="text-zinc-600 text-xs font-mono">
              © 2025 A. ISSADURROFIQ. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
