import React, { useState, useEffect } from "react";
import { addGoal, updateGoal } from "../../utils/GoalApi";
import "../../styles/modals/SideBarModal.css";
import DefaultModal from "./DefaultModal";

const SideBarModal = ({ isOpen, onClose, token, goal, onSave }) => {
  const [specific, setSpecific] = useState("");
  const [measurableValue, setMeasurableValue] = useState("");
  const [measurableUnit, setMeasurableUnit] = useState("times");
  const [measurableContext, setMeasurableContext] = useState("");
  const [achievable, setAchievable] = useState("");
  const [relevant, setRelevant] = useState("");
  const [timebound, setTimebound] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (goal) {
      setSpecific(goal.specific || "");
      setMeasurableValue(goal.measurableValue || "");
      setMeasurableUnit(goal.measurableUnit || "times");
      setMeasurableContext(goal.measurableContext || "");
      setAchievable(goal.achievable || "");
      setRelevant(goal.relevant || "");
      setTimebound(goal.timebound ? goal.timebound.split("T")[0] : "");
    }
  }, [goal]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goalData = { specific, measurableContext, measurableValue, measurableUnit, achievable, relevant, timebound };

    try {
      if (goal) {
        const goalUpdate = await updateGoal(goal._id, goalData);
        if (goalUpdate) {
          await onSave(goal._id, goalData)
          setModalMessage("Goal updated successfully!");
          setModalOpen(true);
        }
      } else {
        const newGoal = await addGoal(goalData, token);
        if (newGoal) {
          setModalMessage("Goal added successfully!");
          setModalOpen(true);
        }
      }        
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{goal ? "✏️ Edit Your Goal" : "🎯 Set Your Goal"}</h2>
          <button onClick={onClose} className="close-button">✖</button>
        </div>
        <p className="modal-description">
          Define and track your personal or professional goals using the SMART framework.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="specific">🔍 Specific</label>
            <small>Define what you want to achieve in clear terms. For example, instead of "get better at my job", you could say "get better at my writing skills". </small>
            <textarea
              id="specific"
              value={specific}
              onChange={(e) => setSpecific(e.target.value)}
              placeholder="Enter your goal description..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="measurable">📏 Measurable</label>
            <small>Set a way to track your progress, such as a number you want to reach. </small>
            <div className="measurable-group">
              <input
                type="text"
                id="measurable-context"
                placeholder="What are you measuring? (e.g. Reading)"
                value={measurableContext}
                onChange={(e) => setMeasurableContext(e.target.value)}
              />
              <input
                type="number"
                id="measurable"
                value={measurableValue}
                onChange={(e) => setMeasurableValue(e.target.value)}
                placeholder="Enter a number"
                min="1"
                required
              />
              <select value={measurableUnit} onChange={(e) => setMeasurableUnit(e.target.value)}>
                <option value="times">Times</option>
                <option value="hours">Hours</option>
                <option value="words">Words</option>
                <option value="pages">Pages</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="achievable">✅ Achievable</label>
            <small>How will you achieve this goal? Make sure your goal is within your capabilities and that you believe you can achieve it.</small>
            <textarea
              id="achievable"
              value={achievable}
              onChange={(e) => setAchievable(e.target.value)}
              placeholder="Describe how you plan to achieve this goal..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="relevant">🎯 Relevant</label>
            <small>Why does this goal matter to you? 
              Ensure your goal aligns with your overall objectives and is important to you. </small>
            <textarea
              id="relevant"
              value={relevant}
              onChange={(e) => setRelevant(e.target.value)}
              placeholder="Explain why this goal is important..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="timebound">⏳ Time-bound</label>
            <small>Set a deadline for completion so you have something to work toward. </small>
            <input
              type="date"
              id="timebound"
              value={timebound}
              onChange={(e) => setTimebound(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            {goal ? "💾 Save Changes" : "🚀 Set Goal"}
          </button>
        </form>
      </div>
        <DefaultModal 
          isOpen={modalOpen} 
          onClose={() => {
            setModalOpen(false);
            onClose();
          }} 
          message={modalMessage} 
        />
    </div>
  );
};

export default SideBarModal;
