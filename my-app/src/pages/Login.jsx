import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to the server
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Login successful, clear the form and display success message
        setFormData({
          username: '',
          password: ''
        });
        setSuccessMessage(data.message);
        setErrorMessage('');
        // render ToDoList page after 2 seconds
        setTimeout(() => {navigate('/todo')}, 2000); // Navigate to the ToDoList page
      } else {
        // Login failed, display the error message
        if (data && data.err) {
          // Error message in the expected format
          setErrorMessage(data.err);
        } else {
        // Handle other error formats or set a default error message
        setErrorMessage('An error occurred');
      }
      setSuccessMessage('');
    }
    } catch (error) {
      console.error('Error:', error);
    }
  };

return (
  <div>
    <h1>Our App</h1>
    <h3>Login</h3>
    {successMessage && (
      <h5>{successMessage}</h5>
    )}
    {errorMessage && (
      <h5>{errorMessage}</h5>
    )}
    <div
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <input
        label="Username"
        variant="outlined"
        margin="normal"
        fullWidth
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={onChange}
      />
      <input
        label="Password"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
      />
      <button type="submit" variant="contained" sx={{ marginTop: '10px' }}>Login</button>
    </div>
  </div>
);
};

export default Login;