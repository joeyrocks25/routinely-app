import React, { useState } from 'react';
import './SignUpForm.css';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../../api/authApi'; // Import API functions

const SignUpForm = () => {
    const navigate = useNavigate();

    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    const handleSignUp = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const data = await registerUser(username, email, password);
        console.log(data);
        // Handle response (e.g., show a success message or navigate)
        if (data.message) {
            alert(data.message); // Show the message returned from the API
        }
    };

    const handleSignIn = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const data = await loginUser(email, password);
        console.log(data);
        // Handle response (e.g., save the token, show a success message, navigate)
        if (data.token) {
            localStorage.setItem('token', data.token); // Save token to local storage
            navigate('/home'); // Adjust the path as needed
        } else {
            alert(data.message || 'Login failed'); // Show an error message
        }
    };

    return (
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-wrapper">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUp}>
                        <h2>Create Account</h2>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button className="custom-btn">Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignIn}>
                        <h2>Sign in</h2>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <a href="#">Forgot your password?</a>
                        <button className="custom-btn">Sign In</button>
                    </form>
                </div>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h2>Welcome Back!</h2>
                        <p>To keep connected with us, please login with your personal info</p>
                        <button className="custom-btn ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h2>Hello, Friend!</h2>
                        <p>Enter your personal details and start your journey with us</p>
                        <button className="custom-btn ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
