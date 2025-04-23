const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://book-directory-frontend.onrender.com'],
    credentials: true
}));

// Middleware
app.use(express.json());

// MongoDB connection with proper error handling
const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        console.log('Attempting to connect to MongoDB...');
        
        // Remove any query parameters from the connection string
        const baseUri = uri.split('?')[0];
        
        await mongoose.connect(baseUri, {
            dbName: 'bookDirectory'
        });
        
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Connect to MongoDB
connectDB();

// Routes
const bookRoutes = require('./routes/bookRoutes');

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.use('/api/books', bookRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Book Directory API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));