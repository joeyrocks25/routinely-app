import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/buttons/DefaultButton.css';

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <div className="landing-page" align="center">
                <h1>Welcome to the Routinely app</h1>
                <h2>Overview</h2>
                <Link to="/goal" className='default-button'>Get Started</Link>
            </div>
        </div>
    );
};

export default LandingPage;