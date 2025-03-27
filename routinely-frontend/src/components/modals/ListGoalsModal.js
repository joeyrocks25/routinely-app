import React, { useState, useEffect } from "react";
import { fetchUserData, deleteGoal } from "../../utils/GoalApi";
import "../../styles/modals/ListGoalsModal.css";
import DefaultModal from "./DefaultModal";
import SideBarModal from "./SideBarModal";

const ListGoalsModal = ({ isOpen, onClose, token, onSave }) => {
  const [goals, setGoals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const goalsPerPage = 5;

  useEffect(() => {
    if (isOpen) fetchGoals();
  }, [isOpen]);

  const fetchGoals = async () => {
    try {
      const response = await fetchUserData(token);
      setGoals(response?.goals || []);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
  };

  const handleSaveEdit = async (goalId, updatedGoal) => {
    try {
      setGoals(goals.map((goal) => (goal._id === goalId ? { ...goal, ...updatedGoal } : goal)));
      setModalMessage("Goal updated successfully!");
      setModalOpen(true);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  // Just log the delete action, don't actually delete
  const handleDeleteGoal = async (goalId) => {
    try{
      const goalUpdate = await deleteGoal(goalId);
      if(goalUpdate) {
        // possibly tacky, look for alternatives?
        setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
        console.log("test")
      }
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
  };

  // Pagination Logic
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);

  const nextPage = () => {
    if (indexOfLastGoal < goals.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header-goals">
          <h2>📋 Your Goals</h2>
          <button onClick={onClose} className="close-button">✖</button>
        </div>

        <ul className="goal-list">
          {currentGoals.length > 0 ? (
            currentGoals.map((goal, index) => (
              <li key={goal._id} className="goal-item">
                <span onClick={() => setSelectedGoal(goal)}>
                  {index + 1 + indexOfFirstGoal}. {goal.specific}
                </span>
                <div className="goal-actions">
                  <button className="edit-btn" onClick={() => handleEditGoal(goal)}>✏️</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteGoal(goal._id)} 
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No goals found.</p>
          )}
        </ul>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>⬅ Previous</button>
          <span> Page {currentPage} </span>
          <button onClick={nextPage} disabled={indexOfLastGoal >= goals.length}>Next ➡</button>
        </div>
      </div>
      <SideBarModal
        isOpen={!!editingGoal}
        onClose={() => setEditingGoal(null)}
        token={token}
        goal={editingGoal}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default ListGoalsModal;
