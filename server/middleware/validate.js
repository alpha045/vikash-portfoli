export const validateContactInput = (req, res, next) => {
  const { name, email, subject, message } = req.body

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Valid name is required.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Valid email address is required.' })
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Subject is required.' })
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ success: false, message: 'Message must be at least 5 characters long.' })
  }

  // Sanitize trimmed inputs
  req.body.name = name.trim()
  req.body.email = email.trim().toLowerCase()
  req.body.subject = subject.trim()
  req.body.message = message.trim()

  next()
}
