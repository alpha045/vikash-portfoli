import express from 'express'
import { sendContactEmail } from '../controllers/contactController.js'
import { contactRateLimiter } from '../middleware/rateLimiter.js'
import { validateContactInput } from '../middleware/validate.js'

const router = express.Router()

router.post('/send', contactRateLimiter, validateContactInput, sendContactEmail)

export default router
