import React from 'react';
import '../styles/Sidebar.css';
import SideBarButton from '../components/buttons/SideBarButton';

const SideBar = ({ openGoalModal, openListGoalsModal }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-buttons">
                <SideBarButton name="➕ Set Goals" onClick={openGoalModal} />

                <SideBarButton name="📋 View/Log Goals" onClick={openListGoalsModal} />

                <SideBarButton name="📊 View Metrics" onClick={() => alert("Metrics coming soon!")} />
            </div>
        </div>
    );
};

export default SideBar;
