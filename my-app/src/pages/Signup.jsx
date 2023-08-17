import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

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
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Signup successful, clear the form and display success message
        setFormData({
          username: '',
          password: ''
        });
        // render Login page after 2 seconds
        setTimeout(() => {navigate('/log')}, 2000); // Navigate to the Login page
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };

return (
  <div>
    <h1>Our App</h1>
    <h3>Signup</h3>
    <form
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
      <button type="submit" variant="contained" sx={{ marginTop: '10px' }}>Signup</button>
    </form>
  </div>
);
};

export default Signup;