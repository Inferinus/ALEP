// SignIn.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginStyles.css';

function SignIn({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', result.user.id);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        alert('Email or password is incorrect!');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          </div>
          <button type="submit">Sign In</button>
          <p>Don't have an account? <Link to="/signup">Sign Up Here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
