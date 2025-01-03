// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');

// Importing route files
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
require('dotenv').config();

// Initializing the Express app
const app = express();

// Global rate limiter (limits all API routes)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per IP
  message: 'Too many requests from this IP, please try again later.',
});

// Rate limiter for contact form
const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  max: 3, // 3 requests per day
  message: 'Daily limit for sending messages reached. Try again tomorrow.',
});

// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware setup
app.set('trust proxy', true);
app.use(express.json());

// Logging middleware for all incoming requests
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

// Apply global rate limiter to API routes
app.use('/api', globalLimiter);

// Define API routes
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/auth', authRoutes);

// Serve the React frontend build files
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Fallback route for React frontend
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    next(); // API routes are handled separately
  } else {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  }
});

// Export the app for use in other modules
module.exports = app;
