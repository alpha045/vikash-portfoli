import React from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { FiFileText, FiExternalLink } from 'react-icons/fi'
import HRGASandbox from './HRGASandbox'

function Research() {
  const data = usePortfolioData()

  if (!data) return null
  if (!data.research || data.research.length === 0) return null

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Research & Publications</h2>
        <div className="flex-grow h-px bg-border ml-4 hidden md:block" />
      </div>

      <div className="space-y-6">
        {data.research.map((item, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-8 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <h3 className="text-xl font-bold text-foreground flex items-start gap-3">
                <FiFileText className="text-primary mt-1 shrink-0" />
                <span>{item.title}</span>
              </h3>
              {item.link && item.link !== '#' && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-all whitespace-nowrap shrink-0"
                >
                  Read Paper <FiExternalLink size={14} />
                </a>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>

            <div className="px-4 py-3 bg-background/60 border border-border border-l-2 border-l-primary rounded-lg text-sm italic text-muted-foreground">
              Published in: {item.publication}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Research Simulator */}
      <HRGASandbox />
    </section>
  )
}

export default Research

