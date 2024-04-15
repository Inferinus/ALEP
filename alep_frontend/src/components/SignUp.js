// SignUp.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert('Registration successful. Please sign in.');
        navigate('/signin'); // Redirect to sign-in page
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="firstname">First Name: </label>
            <input
              type="text"
              name="firstname"
              value={userData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="lastname">Last Name: </label>
            <input
              type="text"
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
          <p>Already have an account? <Link to="/signin">Sign in here</Link></p>
        </form>
        </div>
    </div>
  ); 
}

export default SignUp;
