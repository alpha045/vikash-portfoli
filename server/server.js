
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Trust the Render reverse proxy.
// Use 1 only when the trusted deployment path is one proxy hop.
app.set('trust proxy', 1);

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://vikash16.netlify.app',
];

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse JSON request bodies
app.use(express.json({ limit: '10kb' }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Vikash Portfolio Email API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Contact routes
app.use('/api/v1/contact', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Endpoint not found.',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio Email API listening on port ${PORT}`);
});
