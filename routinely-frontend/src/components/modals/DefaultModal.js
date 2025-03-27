import React from "react";
import "../../styles/modals/DefaultModal.css"; 

const DefaultModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="default-modal-overlay">
      <div className="default-modal-content">
        <div className="default-modal-body">
          <p>{message}</p>
        </div>
        <div className="default-modal-footer">
          <button className="default-modal-close-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultModal;
