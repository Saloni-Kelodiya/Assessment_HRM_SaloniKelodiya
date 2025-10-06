// Load environment variables at the very top
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database (MONGO_URI from .env)
connectDB();

// Allowed origins for CORS
const allowedOrigins = [
  'https://assessment-hrm-salonikelodiya-1.onrender.com', // deployed frontend
  'http://localhost:3000' // local frontend
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allow these HTTP methods
}));

// Enable preflight requests for all routes
app.options('*', cors());

// Parse incoming JSON requests
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('API is running successfully!'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employee', require('./routes/employee'));

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
