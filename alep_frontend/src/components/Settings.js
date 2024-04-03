// Settings.js
import React, { useState, useEffect } from 'react';

function Settings() {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

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
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    email: data.email,
                });
            })
            .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    const handleUserDataChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handlePasswordDataChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleEditInfoSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');

        fetch(`/api/update_user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.ok ? alert('Profile updated successfully.') : alert('Failed to update profile.'))
        .catch(error => console.error('Error updating user data:', error));
    };

    const handleChangePasswordSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }
    
        fetch(`/api/change_password/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                // Optionally reset form or redirect
            } else if (data.error) {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error changing password:', error);
        });
    };
    

    return (
        <div className="Settings">
            <h2>Settings</h2>
            {!isEditingInfo && !isChangingPassword && (
                <div>
                    <p>First Name: {userData.firstname}</p>
                    <p>Last Name: {userData.lastname}</p>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <button onClick={() => setIsEditingInfo(true)}>Edit Info</button>
                    <button onClick={() => setIsChangingPassword(true)}>Change Password</button>
                </div>
            )}
            {isEditingInfo && (
  <form onSubmit={handleEditInfoSubmit}>
    <div>
      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        name="firstname"
        value={userData.firstname}
        onChange={handleUserDataChange}
        required
      />
    </div>
    <div>
      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        name="lastname"
        value={userData.lastname}
        onChange={handleUserDataChange}
        required
      />
    </div>
    <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={userData.username}
        onChange={handleUserDataChange}
        required
      />
    </div>
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleUserDataChange}
        required
      />
    </div>
    <button type="submit">Update Profile</button>
    <button type="button" onClick={() => setIsEditingInfo(false)}>Go Back</button>
  </form>
)}

            {isChangingPassword && (
                <form onSubmit={handleChangePasswordSubmit}>
                    <div>
                        <label>Current Password:</label>
                        <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordDataChange} required />
                    </div>
                    <div>
                        <label>New Password:</label>
                        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordDataChange} required />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordDataChange} required />
                    </div>
                    <button type="submit">Change Password</button>
                    <button type="button" onClick={() => setIsChangingPassword(false)}>Go Back</button>
                </form>
            )}
        </div>
    );
}

export default Settings;
