import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/UserApi";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        }

        console.log("Sending Data: ", loginData);
        
        const response = await loginUser(loginData);
        console.log("API Response:", response);

        if (response?.token) {
            navigate('/goal');
        } else {
            alert("Login failed! Check your credentials.");
        }

    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;