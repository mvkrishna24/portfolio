import './styles/globals.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import SectionDivider from './components/SectionDivider'
import PageTransition from './components/PageTransition'

import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <PageTransition>
        <main>
          <Hero />

          <SectionDivider label="01 — ABOUT" />
          <About />

          <SectionDivider label="02 — SKILLS" />
          <Skills />

          <SectionDivider label="03 — PROJECTS" />
          <Projects />

          <SectionDivider label="04 — CONTACT" />
          <Contact />
        </main>

        <Footer />
      </PageTransition>
    </>
  )
}

export default App