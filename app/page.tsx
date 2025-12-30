import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import TechStackScroll from '@/components/TechStackScroll'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import About from '@/components/About'
import Contact from '@/components/Contact'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div className="bg-black text-zinc-300 font-sans selection:bg-primary selection:text-black">
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <TechStackScroll />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
      </div>
    </>
  )
}
