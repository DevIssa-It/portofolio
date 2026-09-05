import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { BentoSection } from '@/components/bento/BentoSection'
import Projects from '@/components/Projects'
import Journey from '@/components/Journey'
import { GuestbookSection } from '@/components/GuestbookSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { CommandPalette } from '@/components/micro/CommandPalette'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#07090e] text-black dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <BentoSection />
        <Projects />
        <Journey />
        <GuestbookSection />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </div>
  )
}
