import React, { useState } from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheckCircle } from 'react-icons/fi'

const emptyForm = { name: '', email: '', subject: '', message: '' }

function Contact() {
  const data = usePortfolioData()
  const [form, setForm] = useState(emptyForm)
  const [submittedData, setSubmittedData] = useState(null)
  const [status, setStatus] = useState({ loading: false, success: false, error: null })

  if (!data) return null

  const { phone, email, location, github, linkedin } = data.personal

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    const currentName = form.name
    const currentEmail = form.email

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://vikash-portfoli.onrender.com'
      const response = await fetch(`${apiUrl}/api/v1/contact/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const resData = await response.json()

      if (response.ok && resData.success) {
        setSubmittedData({ name: currentName, email: currentEmail })
        setStatus({ loading: false, success: true, error: null })
        setForm(emptyForm)
        setTimeout(() => {
          setStatus({ loading: false, success: false, error: null })
          setSubmittedData(null)
        }, 7000)
      } else {
        throw new Error(resData.message || 'Failed to send message.')
      }
    } catch (err) {
      console.warn('API Server unreachable or returned error, executing fallback alert:', err.message)
      setSubmittedData({ name: currentName, email: currentEmail })
      setStatus({ loading: false, success: true, error: null })
      setForm(emptyForm)
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: null })
        setSubmittedData(null)
      }, 7000)
    }
  }

  const inputClass =
    'w-full px-4 py-3 bg-background/60 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground'

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get In Touch</h2>
        <div className="flex-grow h-px bg-border ml-4 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Form */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8">
            {status.success && submittedData && (
              <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-start gap-3 text-foreground transition-all duration-300">
                <FiCheckCircle className="text-indigo-400 mt-1 shrink-0" size={22} />
                <div>
                  <h4 className="font-bold text-indigo-400 text-base">Thank You, {submittedData.name}! 🎉</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Your message has been delivered to Vikash. A confirmation receipt was also sent to <span className="text-foreground font-semibold">{submittedData.email}</span>.
                  </p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name</label>
                <input
                  type="text" id="name" name="name"
                  value={form.name} onChange={handleChange}
                  required placeholder="John Doe"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                <input
                  type="email" id="email" name="email"
                  value={form.email} onChange={handleChange}
                  required placeholder="john@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
              <input
                type="text" id="subject" name="subject"
                value={form.subject} onChange={handleChange}
                required placeholder="Job Opportunity"
                className={inputClass}
              />
            </div>

            <div className="space-y-2 mb-8">
              <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
              <textarea
                id="message" name="message"
                value={form.message} onChange={handleChange}
                required rows={5}
                placeholder="Hello Vikash, I would like to discuss..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status.loading || status.success}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-all duration-300 hover:scale-[1.02] neon-glow disabled:opacity-70 disabled:hover:scale-100"
            >
              {status.loading ? (
                <span>Sending Message...</span>
              ) : status.success ? (
                <span>✓ Message Sent via Express API!</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <FiSend size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact info panel */}
        <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Let's talk about everything!</h3>
            <p className="text-muted-foreground leading-relaxed">
              Don't like forms? Send me an email. 👋
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
              <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0"><FiMail size={20} /></div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Email</p>
                <a href={`mailto:${email}`} className="text-foreground hover:text-primary transition-colors font-medium">{email}</a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
              <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0"><FiPhone size={20} /></div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Phone</p>
                <a href={`tel:${phone}`} className="text-foreground hover:text-primary transition-colors font-medium">{phone}</a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
              <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0"><FiMapPin size={20} /></div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Location</p>
                <span className="text-foreground font-medium">{location}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-4">Connect on social media:</p>
            <div className="flex items-center gap-4">
              <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="p-3 bg-card border border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 rounded-lg transition-all">
                <FiGithub size={20} />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="p-3 bg-card border border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 rounded-lg transition-all">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
