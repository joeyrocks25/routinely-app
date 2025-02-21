import React, { useState } from 'react';
import './GoalsForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import AddGoalButton from '../../buttons/add-goal-button/AddGoalButton';
import AddGoalModal from '../../modals/add-goal-modal/AddGoalModal';

const GoalsForm = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleAddGoal = () => {
        setIsFormVisible(true); 
    };

    const handleCloseModal = () => {
        setIsFormVisible(false);
    };

    return (
        <form className='goals-form'>
            <label>Test:</label>
            <FontAwesomeIcon icon={faStar} className="star-icon" />
            <label className='goal-info'>Here you can create your very own targets that you wish to achieve.</label>
            
            {!isFormVisible && ( 
                <AddGoalButton onClick={handleAddGoal} />
            )}
            <AddGoalModal open={isFormVisible} onClose={handleCloseModal} />
        </form>
    );
};

export default GoalsForm;
