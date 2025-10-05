// Environment variables load karna (local dev ke liye)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const connectDB = require('./config/db');  // MongoDB connection logic yahan define hai
const cors = require('cors');
const path = require('path');

// Express app initialize
const app = express();

// MongoDB connect karein (MONGO_URI .env se)
connectDB();

// Middleware setup
app.use(cors());             // CORS enable
app.use(express.json());     // JSON body parser

// Health check / root route
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});

// API route imports
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employee', require('./routes/employee'));

// Production mode mein React frontend serve karna
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Frontend', 'build', 'index.html'));
    });
}


// Server port setup (Render environment variable ya default 8000)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
