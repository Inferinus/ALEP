import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('/api/forgot_password', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({newPassword: newPassword}),
            });
            const result = await response.json();
            if(response.ok) {
                alert('Password reset successfully.');
            } else {
                alert(result.error);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }

    };

    return (
        <div className='ForgotPassword'>
            <h2>Forgot Password</h2>
            <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='newPassword'>New Password:</label>
                    <input
                        type='password'
                        name='newPassword'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'> 
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Reset Password</button>
                <p>Remembered Your Password? <Link to="/signin">Sign In Here</Link></p>
            </form>
            </div>
        </div>
    );
}

export default ForgotPassword;