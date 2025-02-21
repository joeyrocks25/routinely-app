import React from 'react';
import './AddGoalButton.css';

const AddGoalButton = ({ onClick }) => {
    return (
        <button type="button" className='add-goal' onClick={onClick}>
            Add goal
        </button>
    );
};

export default AddGoalButton;

