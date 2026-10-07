import React, { useState } from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import {
  SiJavascript, SiPython, SiCplusplus, SiMysql, SiDart,
  SiReact, SiFlutter, SiHtml5, SiCss, SiTailwindcss, SiNodedotjs,
  SiExpress, SiMongodb, SiFirebase, SiGit, SiGithub,
  SiLinux, SiPostman, SiJsonwebtokens,
} from 'react-icons/si'
import { FaMobileAlt, FaDatabase } from 'react-icons/fa'
import { TbApi } from 'react-icons/tb'
import { FiCode } from 'react-icons/fi'

// icon key → component (SiCss3 in data maps to SiCss in react-icons v5)
const iconMap = {
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiMysql,
  SiDart,
  SiFlutter,
  SiReact,
  SiHtml5,
  SiCss3: SiCss,
  SiTailwindcss,
  FaMobileAlt,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  TbApi,
  SiGit,
  SiGithub,
  SiLinux,
  SiPostman,
  SiJsonwebtokens,
  FaDatabase,
}

function getLevelBadgeStyle(level) {
  switch (level.toLowerCase()) {
    case 'advanced':     return { badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', bar: 'from-indigo-500 to-cyan-400', percent: 90 }
    case 'intermediate': return { badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20', bar: 'from-purple-500 to-pink-500', percent: 75 }
    case 'beginner':     return { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', bar: 'from-emerald-500 to-teal-400', percent: 55 }
    default:             return { badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20', bar: 'from-gray-500 to-slate-400', percent: 65 }
  }
}

function Skills() {
  const data = usePortfolioData()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0 })

  if (!data) return null

  const skills = data.skills
  const categories = ['All', ...new Set(skills.map(s => s.category))]
  const filtered =
    activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Skills & Expertise</h2>
        <div className="flex-grow h-px bg-border ml-4 hidden md:block" />
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill cards grid with animated progress bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((skill, i) => {
          const Icon = iconMap[skill.icon] || FiCode
          const levelInfo = getLevelBadgeStyle(skill.level)

          return (
            <div
              key={`${skill.name}-${i}`}
              className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 hover:border-primary/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/10 group glass-card"
            >
              {/* Header: Icon + Name */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-3xl text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Icon />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-foreground text-base leading-snug">{skill.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      {skill.category}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${levelInfo.badge}`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full mt-1">
                <div className="flex justify-between text-xs text-muted-foreground mb-1 font-mono">
                  <span>Proficiency</span>
                  <span>{levelInfo.percent}%</span>
                </div>
                <div className="w-full h-2 bg-secondary/30 rounded-full overflow-hidden p-0.5 border border-border/50">
                  <div
                    style={{
                      width: isVisible ? `${levelInfo.percent}%` : '0%',
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-1000 ease-out"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Skills
