// src/pages/landing-page/LandingPage.js
import React from 'react';
import './LandingPage.css'; // Importing the CSS for the LandingPage
import Lottie from 'lottie-react';
import BowAndArrow from './animations/BowAndArrow.json';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import Navbar from '../../components/navbar/landing-page-navbar/Navbar';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle navigation on button clicks
  const handleLogin = () => {
    navigate('/home'); // Navigate to the home page
  };

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <div className="landing-page-container">
      <header className="landing-page-header">
        <Navbar></Navbar>
      </header>
      <div className="animation-container">
        <Lottie animationData={BowAndArrow} loop={true} />
      </div>
    </div>
  );
};

export default LandingPage;
