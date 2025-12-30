import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import InfiniteScroll from '@/components/InfiniteScroll'
import Projects from '@/components/Projects'
import ParallaxSection from '@/components/ParallaxSection'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <InfiniteScroll />
      <Projects />
      <ParallaxSection />
      <TestimonialsCarousel />
      <Contact />
      <Footer />
    </main>
  )
}
