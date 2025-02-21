import React from 'react';
import './SignUp.css'; // Import the CSS
import SignUpForm from '../../components/signup/SignUpForm';

const AuthForm = () => {

  return (
    <div>
        <div className="title">
          <h1>TargetFinder</h1>
          <p>Out of chaos, comes order</p>
          <SignUpForm></SignUpForm>
        </div>
    </div>
  );
};

export default AuthForm;
