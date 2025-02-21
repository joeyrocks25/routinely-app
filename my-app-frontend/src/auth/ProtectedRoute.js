import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check for JWT token in local storage or cookies
    const token = localStorage.getItem('token'); // Change this if you use cookies

    console.log("token = ", token);
    // If there's no token, redirect to the login page
    if (!token) {
        return <Navigate to="/signup" />;
    }

    // If the token exists, render the children components
    return children;
};

export default ProtectedRoute;
