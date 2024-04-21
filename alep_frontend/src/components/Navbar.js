import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId'); // Clear user ID from local storage
        setIsAuthenticated(false); // Update isAuthenticated state
        navigate('/signin'); // Redirect the user to the sign-in page
    };

    return (
        <nav className='navbar'>
            <ul className='navbar-nav'>
                <div className='left-nav'>
                    <li className='nav-item'>
                        <Link to="/dashboard" className='nav-link'>Dashboard</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/settings" className='nav-link'>Profile Settings</Link>
                    </li>
                </div>
                <li className='nav-item'>
                    <Link onClick={handleLogout} className='nav-link'>Logout</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
