import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/signup");
    };
    
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <h2>TargetFinder</h2>
            <div className="get-started">
                <button onClick={handleLogin}>Get Started</button>
          </div>
        </nav>
    );
}; 

export default Navbar;