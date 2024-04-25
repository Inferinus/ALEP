// Settings.js
import React, { useState, useEffect } from 'react';

function Settings({ setIsAuthenticated }) {
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
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

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
    .then(setIsEditingInfo(false)) //Close editing form
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
          setIsChangingPassword(false);
      })
      .catch(error => {
          console.error('Error changing password:', error);
      });
  };

  const handleDeleteAccount = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
  
      const response = await fetch(`/api/delete_user/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Account deleted successfully.');
        localStorage.removeItem('userId'); // Remove user ID from local storage
        setIsAuthenticated(false); // Update authenticated state
        window.location.href = '/signin'; // Redirect to sign-in page
      } else {
        alert('Failed to delete account.');
      }
    };



  return (
    <div className="Settings">
        <h2>Settings</h2>
        {!isEditingInfo && !isChangingPassword && (
            <>
                <div className='settings-form-container'>
                    <div>
                        <p>First Name: {userData.firstname}</p>
                        <p>Last Name: {userData.lastname}</p>
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                        <div style={{padding: '10px'}}>
                            <button onClick={() => setIsEditingInfo(true)}>Edit Info</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={() => setIsChangingPassword(true)}>Change Password</button>
                        </div>
                    </div>
                    <div>
                        <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setIsDeletingAccount(true)}>
                            Delete Account
                        </button>
                    </div>
                </div>
            </>
        )}
        {isEditingInfo && (
    <div className='settings-form-container'>
    <form onSubmit={handleEditInfoSubmit}>
        <div>
            <div className='settings-form-group'>
                <label htmlFor="firstname">First Name: </label>
                <input
                    type="text"
                    name="firstname"
                    value={userData.firstname}
                    onChange={handleUserDataChange}
                    required
                />
            </div>
            <div className='settings-form-group'>
                <label htmlFor="lastname">Last Name: </label>
                <input
                    type="text"
                    name="lastname"
                    value={userData.lastname}
                    onChange={handleUserDataChange}
                    required
                />
            </div>
            <div className='settings-form-group'>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleUserDataChange}
                    required
                />
            </div>
            <div className='settings-form-group'>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleUserDataChange}
                    required
                    style = {{marginLeft: '33px'}}
                />
            </div>
            <button type="submit">Update Profile</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" onClick={() => setIsEditingInfo(false)}>Cancel</button>
            </div>
    </form>
    </div>
)}

{isChangingPassword && (
    <div className='settings-form-container' >
    <form onSubmit={handleChangePasswordSubmit}>
        <div className='settings-form-group'>
            <label>Current Password: </label>
            <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordDataChange}
                required
            />
        </div>
        <div className='settings-form-group'>
            <label>New Password: </label>
            <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordDataChange}
                required
            />
        </div>
        <div className='settings-form-group'>
            <label>Confirm New Password: </label>
            <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordDataChange}
                required
            />
        </div>
        <button type="submit">Change Password</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" onClick={() => setIsChangingPassword(false)}>Cancel</button>
    </form>
    </div>
)}

        {isDeletingAccount && (
            <div className='settings-form-container-delete'>
                <p>Are you sure you want to delete your account?</p>
                <button onClick={handleDeleteAccount}>Yes</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => setIsDeletingAccount(false)}>No</button>
            </div>
        )}
    </div>
  );
}

export default Settings;
