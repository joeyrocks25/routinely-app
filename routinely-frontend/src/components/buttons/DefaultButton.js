import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/buttons/DefaultButton.css';
import { registerUser } from "../../utils/UserApi";
import { getToken } from "../../utils/GoalApi";


const DefaultButton = ({ link, name }) => {
    const navigate = useNavigate();

    const guest = async () => {
        if (name === "Get Started" && (await getToken()) === null) {
            const userData = {
                isGuest: true 
            };

            try {
                const response = await registerUser(userData);
                if (response?.token) {
                    console.log('Guest user registered successfully:', response);
                    navigate(link);
                } else {
                    console.error('Failed to register guest user:', response);
                }
            } catch (error) {
                console.error("Error registering guest user:", error);
            }
        }
        navigate(link);
    }

    return (
        <button onClick={guest} className="nav-button-1">
            {name}
        </button>
    );
};

export default DefaultButton;
