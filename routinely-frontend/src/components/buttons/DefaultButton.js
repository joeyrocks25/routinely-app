import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/buttons/DefaultButton.css';

const DefaultButton = ({ link, name }) => {
    return (
        <Link to={link} className="nav-button-1">{name}</Link>
    );
};

export default DefaultButton;
