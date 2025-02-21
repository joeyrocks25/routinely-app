import React from 'react';
import './Navbar.css';
import { useAuth } from '../../../auth/context'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useAuth(); // Get the logout function from AuthContext
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate('/signup'); 
    };
    
    return (
        <nav className="navbar">
            <ul className="nav-links">
                {/* Add any other links here */}
            </ul>
            <h2>TargetFinder</h2>
            <div className="get-started">
                <button onClick={handleLogout}>Sign Out</button>
            </div>
        </nav>
    );
};

export default Navbar;
