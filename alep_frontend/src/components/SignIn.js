// SignIn.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function SignIn({ setIsAuthenticated }) { // Destructure setIsAuthenticated from props
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

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
        /*alert('Sign in successful');*/
        localStorage.setItem('userId', result.user.id); // Storing user ID
        setIsAuthenticated(true); // Update the authentication state
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        alert('Email or password is incorrect!'); // Show error message from server
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };


  return (
    <div className="SignIn">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      </form>
    </div>
  );
}

export default SignIn;
