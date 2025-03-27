import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import DefaultButton from "../components/buttons/DefaultButton";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="nav-title">Routinely</h1>
                <DefaultButton link="/" name="Home"></DefaultButton>
            </div>

            <div className="navbar-right">
                <DefaultButton link="/login" name="Login"></DefaultButton>
                <DefaultButton link="/signup" name="Signup"></DefaultButton>
            </div>
        </nav>
    );
};

export default Navbar;
