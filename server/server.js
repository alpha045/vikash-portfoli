
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

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
      // Allow requests without an Origin header and trusted origins.
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

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio Email API listening on port ${PORT}`);
});
