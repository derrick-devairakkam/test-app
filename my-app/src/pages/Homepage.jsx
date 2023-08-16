import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/log');
  };

  const handleSignupClick = () => {
    navigate('/sign');
  };

  return (
    <div>
      <h1>Welcome to Our App!</h1>
      <div>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleSignupClick}>Signup</button>
      </div>
    </div>
  );
};

export default Homepage;