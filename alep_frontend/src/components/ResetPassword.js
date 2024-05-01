import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState(1);
  const navigate = useNavigate();

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    await fetch('/api/request_reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    setStage(2); // Proceed to code validation
  };

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/validate_reset_code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });
    if (response.ok) {
      setStage(3); // Proceed to reset password
    } else {
      alert('Invalid or expired code');
    }
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    await fetch('/api/reset_password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword })
    });
    navigate('/signin');
  };

  return (
    <div>
      {stage === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit">Send Reset Code</button>
        </form>
      )}
      {stage === 2 && (
        <form onSubmit={handleCodeSubmit}>
          <label>Reset Code:</label>
          <input type="text" value={code} onChange={e => setCode(e.target.value)} required />
          <button type="submit">Validate Code</button>
        </form>
      )}
      {stage === 3 && (
        <form onSubmit={handleResetSubmit}>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          <label>Confirm New Password:</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
