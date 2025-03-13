import React from 'react';
import '../styles/Sidebar.css';
import Colours from '../styles/Colours';

const SideBar = () => {
    const handleSetGoals = () => {
        console.log("Set Goals clicked");
    };

    const handleViewLogGoals = () => {
        console.log("View/Log Goals clicked");
    };

    const handleViewMetrics = () => {
        console.log("View Metrics clicked");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-buttons">
                <button className="sidebar-button" onClick={handleSetGoals} style={{ backgroundColor: Colours.primary }}>
                    Set Goals
                </button>
                <button className="sidebar-button" onClick={handleViewLogGoals} style={{ backgroundColor: Colours.primary }}>
                    View/Log Goals
                </button>
                <button className="sidebar-button" onClick={handleViewMetrics} style={{ backgroundColor: Colours.primary }}>
                    View Metrics
                </button>
            </div>
        </div>
    );
};

export default SideBar;
