import React from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import Hero3DCanvas from './Hero3DCanvas'

function Hero() {
  const data = usePortfolioData()

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    )
  }

  const { name, title, tagline, resumeUrl, github, linkedin, email } = data.personal

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Text Content */}
        <div className="lg:col-span-7">
          <p className="text-lg sm:text-xl text-foreground font-medium mb-3 tracking-wide">
            Hello, I'm
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-primary mb-4 tracking-tight">
            {name}
          </h1>
          <h2 className="text-3xl sm:text-5xl font-bold text-muted-foreground mb-6">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            {tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href={resumeUrl}  
              download="vikash_resume.pdf"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/25"
            >
              Download Resume
            </a>
            <button
              onClick={() => scrollTo('projects')}
              className="px-8 py-3 bg-card border border-border text-foreground font-medium rounded-md hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-3 text-muted-foreground hover:text-primary font-medium transition-colors"
            >
              Contact Me
            </button>
          </div>

          <div className="flex items-center gap-6 text-muted-foreground">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="GitHub"
            >
              <FiGithub size={24} />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={24} />
            </a>
            <a
              href={`mailto:${email}`}
              className="hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="Email"
            >
              <FiMail size={24} />
            </a>
          </div>
        </div>

        {/* 3D Interactive Canvas Column */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <Hero3DCanvas />
        </div>
      </div>
    </section>
  )
}

export default Hero

