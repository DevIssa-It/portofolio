import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { BentoSection } from '@/components/bento/BentoSection'
import Projects from '@/components/Projects'
import Journey from '@/components/Journey'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-black">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <BentoSection />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
