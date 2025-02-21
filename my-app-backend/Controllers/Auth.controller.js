// src/controllers/Auth.controller.js
const { v4: uuidv4 } = require('uuid');
const User = require('../Models/User.model');
const jwt = require('jsonwebtoken');
const logger = require('../Utils/logger'); 

// User registration
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`Registration attempt failed: User already exists (${email})`); // Log existing user
            return res.status(400).json({ message: 'User already exists.' });
        }

        user_id = uuidv4();

        // Create a new user instance
        const newUser = new User({ user_id, username, email, password });

        // Save the user to the database
        await newUser.save();
        logger.info(`User registered successfully: ${username} (${email})`); // Log successful registration
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        logger.error(`Registration error: ${error.message}`); // Log error
        res.status(500).json({ error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            logger.warn(`Failed login attempt for email: ${email}`); // Log failed login
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info(`User logged in: ${user.username} (${email})`); // Log successful login
        res.status(200).json({ token });
    } catch (error) {
        logger.error(`Login error: ${error.message}`); // Log error
        res.status(500).json({ error: error.message });
    }
};
