// Load environment variables from .env file for local development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Initialize Express App
const app = express();

// Connect Database (uses MONGO_URI from process.env)
connectDB();

// --- Middleware Setup ---
// Enable CORS for all routes (important for front-end access)
app.use(cors());
// Body parser middleware for JSON payloads
app.use(express.json());

// --- Routes ---

// Health Check / Root Route
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});

// Authentication Routes
app.use('/api/auth', require('./routes/auth'));

// Employee Management Routes
app.use('/api/employee', require('./routes/employee'));

// --- Server Startup ---
// Render will automatically set process.env.PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Note: Ensure your 'config/db.js' file uses process.env.MONGO_URI
// and that you have set MONGO_URI in your Render environment variables.
