import rateLimit from 'express-rate-limit'

// Limit contact submissions per IP address (relaxed limit in dev mode for testing)
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 5 : 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact inquiries sent from this IP. Please try again after 15 minutes.',
  },
})
