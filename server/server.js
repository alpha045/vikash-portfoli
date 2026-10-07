import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Security & Parsing Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json({ limit: '10kb' }))

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Vikash Portfolio Email API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

// Contact Routes
app.use('/api/v1/contact', contactRoutes)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint not found.' })
})

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Express Backend listening on http://localhost:${PORT}`)
})
