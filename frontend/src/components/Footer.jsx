import React from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

function Footer() {
  const data = usePortfolioData()
  const year = new Date().getFullYear()

  if (!data) return null

  const { name, github, linkedin, email } = data.personal

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold text-primary tracking-tighter mb-2 hover:opacity-80 transition-opacity"
            >
              VK
            </button>
            <p className="text-muted-foreground text-sm text-center md:text-left">
              Building digital products, brands, and experience.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:scale-110">
              <FiGithub size={20} />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:scale-110">
              <FiLinkedin size={20} />
            </a>
            <a href={`mailto:${email}`} aria-label="Email"
              className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:scale-110">
              <FiMail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {year} {name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with <span className="text-red-500 mx-1">❤️</span> by {name}
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
