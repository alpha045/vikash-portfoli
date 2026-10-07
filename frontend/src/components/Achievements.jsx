import React from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { FiAward, FiStar } from 'react-icons/fi'

function getCategoryColor(category) {
  switch (category.toLowerCase()) {
    case 'hackathon':    return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'research':     return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    case 'events':       return 'bg-green-500/10 text-green-400 border-green-500/20'
    case 'certificates': return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    default:             return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }
}

function Achievements() {
  const data = usePortfolioData()

  if (!data) return null

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Achievements & Certifications</h2>
        <div className="flex-grow h-px bg-border ml-4 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.achievements.map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
              <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <FiStar size={12} className="text-primary/50" />
                {item.year}
              </div>
            </div>

            <h3 className="text-lg font-bold text-foreground mb-3 flex items-start gap-2">
              <FiAward className="text-primary mt-0.5 shrink-0" />
              <span>{item.title}</span>
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Achievements
