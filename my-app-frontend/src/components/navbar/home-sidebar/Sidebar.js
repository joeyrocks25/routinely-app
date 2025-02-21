import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ selectedLink, onLinkClick }) => {
    // const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">TargetFinder</h2>
            <ul className="sidebar-links">
                <li>
                    <a 
                        href="#goals" 
                        onClick={() => onLinkClick('goals')}
                        className={selectedLink === 'goals' ? 'active' : ''}
                    >
                        Goals
                    </a>
                </li>
                <li>
                    <a 
                        href="#dashboard" 
                        onClick={() => onLinkClick('dashboard')}
                        className={selectedLink === 'dashboard' ? 'active' : ''}
                    >
                        Dashboard
                    </a>
                </li>
                <li>
                    <a 
                        href="#contact" 
                        onClick={() => onLinkClick('contact')}
                        className={selectedLink === 'contact' ? 'active' : ''}
                    >
                        Contact
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
