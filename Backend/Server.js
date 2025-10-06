// Load environment variables at the very top
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Allowed origins
const allowedOrigins = [
  'https://assessment-hrm-salonikelodiya-1.onrender.com', // deployed frontend
  'http://localhost:3000' // local frontend
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow mobile apps, curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // needed for cookies
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
}));

// Preflight support
app.options('*', cors());

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employee', require('./routes/employee'));

// Root
app.get('/', (req, res) => res.send('API is running successfully!'));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
