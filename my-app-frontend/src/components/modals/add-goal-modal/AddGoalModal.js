import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { TextField, Button } from '@material-ui/core';
import './AddGoalModal.css'; // You can style your modal here

const AddGoalModal = ({ open, onClose }) => {
    const [goalName, setGoalName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic (e.g., send the data to an API or parent component)
        console.log('Goal name:', goalName);
        onClose(); // Close the modal after submitting the form
    };

    return (
        <Modal
            className="modal"
            open={open}
            onClose={onClose}
        >
            <div className="modal-content">
                <h2>Add New Goal</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Goal Name"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                     <TextField
                        label="Goal Name"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <div className="modal-actions">
                        <Button onClick={onClose} color="secondary">Cancel</Button>
                        <Button type="submit" color="primary" variant="contained">
                            Add Goal
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddGoalModal;
