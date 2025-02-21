const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./Databases/Mongo.database'); // Import the MongoDB connection
const authRoutes = require('./Routes/Auth.routes'); // Import the auth routes

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB(); // Call the function to connect to MongoDB

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Sample route (you can replace this with your actual routes later)
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Use authentication routes
app.use('/api/auth', authRoutes); // Uncommented and added the auth routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
