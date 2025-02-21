// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route
import LandingPage from './pages/landing-page/LandingPage';
import HomePage from './pages/home-page/homePage'; 
import SignUp from './pages/sign-up/SignUp';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/context';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
