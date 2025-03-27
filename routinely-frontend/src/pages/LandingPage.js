import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DefaultButton from '../components/buttons/DefaultButton';

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <div className="landing-page" align="center">
                <h1>Welcome to the Routinely app</h1>
                <h2 style ={{ marginTop: '40px' }}>Overview</h2>
                <DefaultButton link="/goal" name="Get Started"></DefaultButton>
            </div>
        </div>
    );
};

export default LandingPage;