import React from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { FiBriefcase, FiCalendar } from 'react-icons/fi'

function Experience() {
  const data = usePortfolioData()

  if (!data) return null

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Experience</h2>
        <div className="flex-grow h-px bg-border ml-4 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.experience.map((exp, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 relative group overflow-hidden"
          >
            {/* Left accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-primary transition-colors duration-300" />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{exp.company}</h3>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <FiBriefcase size={16} />
                  <span>{exp.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 px-3 py-1.5 rounded-full border border-border shrink-0">
                <FiCalendar size={14} />
                <span>{exp.duration}</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
