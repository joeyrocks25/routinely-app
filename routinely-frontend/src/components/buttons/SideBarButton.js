import React from "react";
import "../../styles/buttons/SidebarButton.css";

const SideBarButton = ({ name, onClick }) => {
    return (
        <button className="sidebar-b1" onClick={onClick}>
            {name}
        </button>
    );
};

export default SideBarButton;
