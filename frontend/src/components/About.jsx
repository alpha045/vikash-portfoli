import React from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { FiMapPin, FiBook, FiCheckCircle } from 'react-icons/fi'

function About() {
  const data = usePortfolioData()

  if (!data) return null

  const { name, location, education, currentStatus, bio, stats } = data.personal

  const statsList = [
    { label: 'Projects Completed', value: stats.projects },
    { label: 'Technologies',       value: stats.technologies },
    { label: 'Internships',        value: stats.internships },
    { label: 'Research Papers',    value: stats.research },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
        <div className="flex-grow h-px bg-border ml-4 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Profile card */}
        <div className="lg:col-span-5">
          <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 group-hover:bg-primary/20 transition-colors duration-500" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {currentStatus}
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-4">{name}</h3>

            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-primary shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiBook className="text-primary shrink-0" />
                <span>{education}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-primary shrink-0" />
                <span>Available for full-time roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio + stats */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <p className="text-muted-foreground leading-relaxed text-lg">{bio}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statsList.map((stat, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors group"
              >
                <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                  {(stat.label === 'Projects Completed' || stat.label === 'Technologies') ? '+' : ''}
                </div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
