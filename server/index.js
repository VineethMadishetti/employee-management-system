// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS: Specific origin for Netlify; allow all in dev
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://vineethmern1.netlify.app' 
    : true,
  credentials: true,
}));

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

// Simple test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

// Connect to the database and start the server only if successful
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database. Server will not start.', error);
    process.exit(1); // Exit the process with an error code
});