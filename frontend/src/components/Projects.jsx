import React from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

function Projects() {
  const data = usePortfolioData()

  if (!data) return null

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Projects</h2>
        <div className="flex-grow h-px bg-border ml-4 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.projects.map((project, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] flex flex-col group"
          >
            {/* Thumbnail */}
            <div className="h-48 w-full bg-gradient-to-br from-slate-800 to-slate-900 border-b border-border flex items-center justify-center relative overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="text-5xl font-bold text-muted-foreground/30 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-500 tracking-wider select-none">
                  {project.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()}
                </span>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-full text-foreground hover:text-primary hover:scale-110 transition-all border border-border hover:border-primary/50"
                  aria-label="GitHub"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-full text-foreground hover:text-primary hover:scale-110 transition-all border border-border hover:border-primary/50"
                  aria-label="Live Demo"
                >
                  <FiExternalLink size={20} />
                </a>
              </div>
            </div>

            {/* Card body */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-xs font-medium text-primary/80 bg-primary/10 border border-primary/20 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
