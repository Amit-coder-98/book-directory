const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookDirectory')
    .then(() => {
        // Listen for requests
        app.listen(5000, () => {
            console.log('Connected to MongoDB & Server running on port 5000');
        });
    })
    .catch((error) => {
        console.log(error);
    });