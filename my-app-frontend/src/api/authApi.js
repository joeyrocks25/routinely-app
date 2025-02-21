// src/api/auth.js

const API_URL = 'http://localhost:5000/api/auth';

// Function to register a new user
export const registerUser = async (username, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
    return response.json(); // Return the response as JSON
};

// Function to login a user
export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json(); // Return the response as JSON
};
