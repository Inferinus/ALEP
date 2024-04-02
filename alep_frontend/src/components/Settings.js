// Settings.js
import React, { useState, useEffect } from 'react';

function Settings() {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`/api/retrieve_user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                setUserData({
                    ...userData,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    email: data.email
                    // Don't fetch password
                });
            })
            .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsUpdating(true);
        const userId = localStorage.getItem('userId');

        fetch(`/api/update_user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (response.ok) {
                alert('Profile updated successfully.');
            } else {
                alert('Failed to update profile.');
            }
            setIsUpdating(false);
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            setIsUpdating(false);
        });
    };

    return (
        <div className="Settings">
            <h2>Settings</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} required />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={userData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} required />
                </div>
                <button type="submit" disabled={isUpdating}>Update Profile</button>
            </form>
        </div>
    );
}

export default Settings;
