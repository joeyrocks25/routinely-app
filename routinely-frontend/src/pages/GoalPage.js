import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import SideBarModal from "../components/modals/SideBarModal";
import ListGoalsModal from "../components/modals/ListGoalsModal";

const GoalPage = () => {
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [isListGoalsModalOpen, setIsListGoalsModalOpen] = useState(false);

    return (
        <div>
            <Navbar />
            <SideBar 
                openGoalModal={() => setIsGoalModalOpen(true)} 
                openListGoalsModal={() => setIsListGoalsModalOpen(true)} 
            />
            <SideBarModal 
                isOpen={isGoalModalOpen} 
                onClose={() => setIsGoalModalOpen(false)} 
            />
            <ListGoalsModal 
                isOpen={isListGoalsModalOpen} 
                onClose={() => setIsListGoalsModalOpen(false)} 
            />
            <h1>Goal Page</h1>
            <p>This is the Goal Page.</p>
        </div>
    );
};

export default GoalPage;
