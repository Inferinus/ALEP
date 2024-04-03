import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import LoanApplicationForm from './components/LoanApplicationForm';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  // Initialize isAuthenticated based on localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userId'));

  useEffect(() => {
    // This useEffect hook ensures that isAuthenticated is correctly set upon app initialization or reload.
    // The !! operator converts the getItem result to a boolean: true if userId exists, false otherwise.
    setIsAuthenticated(!!localStorage.getItem('userId'));
  }, []);

  const handleLogout = () => {
    // Clears the userId from localStorage on logout
    localStorage.removeItem('userId');
    // Update isAuthenticated to false to reflect that the user is no longer logged in
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Conditionally render the Navbar if the user is authenticated */}
        {isAuthenticated && <Navbar handleLogout={handleLogout} setIsAuthenticated={setIsAuthenticated}/>}
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          {/* Pass setIsAuthenticated down to SignIn so it can update the app state upon successful login */}
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Conditionally render routes based on authentication status */}
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/apply" element={<LoanApplicationForm />} />
              <Route path="/settings" element={<Settings />} />
            </>
          ) : (
            // Redirect any other route to the signin page if not authenticated
            <Route path="*" element={<Navigate replace to="/signin" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
