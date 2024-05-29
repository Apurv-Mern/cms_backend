import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../api/baseurl';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = () => {
    const {token} = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 const navigate = useNavigate();
  const handleResetPassword = async () => {
    try {
      // Check if passwords match
      if (newPassword !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      const response = await axios.post(`${baseUrl}/api/auth/reset-password/${token}`, {
        newPassword,
        confirmPassword
      });

      // Handle successful response
      console.log(response.data); // Password reset successfully
      toast.success('Password updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Failed to reset password!');
      setErrorMessage('Failed to reset password');
    }
  };

  return (
    <div className='reset-password-container'>
    <button onClick={() => navigate(-1)}> {'<-'}</button>
      <h2>Reset Password</h2>
      <div>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
