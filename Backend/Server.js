// Load environment variables at the very top
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database (MONGO_URI from .env)
connectDB();

// Middleware
const allowedOrigins = [
  'https://assessment-hrm-salonikelodiya-1.onrender.com/', // your deployed frontend URL
  'http://localhost:8000' // optional: for local dev
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin like mobile apps or curl
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('API is running successfully!'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employee', require('./routes/employee'));

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
