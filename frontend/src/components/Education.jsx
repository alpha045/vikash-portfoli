import React from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { FiBookOpen, FiCalendar } from 'react-icons/fi'

function Education() {
  const data = usePortfolioData()

  if (!data) return null

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Education</h2>
        <div className="flex-grow h-px bg-border ml-4 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.education.map((edu, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500" />

            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                <FiBookOpen size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
                <div className="text-primary font-medium">{edu.college}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border">
                <FiCalendar size={14} className="text-primary/70" />
                <span>{edu.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                Grade: <span className="text-primary ml-1">{edu.grade}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education
