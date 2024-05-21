
import React, { useState } from 'react';
import axios from 'axios';
import "./RequestPasswordReset.css"
import { useNavigate } from 'react-router-dom';
import "./ResetPassword.css";
import { baseUrl } from '../../api/baseurl';



const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
const navigate=useNavigate();

  const handleRequestReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/auth/request-password-reset`, { email });
      console.log(response.data.data);
      
      // Navigate to reset password page with token
      const token = response.data.data.resetLink.split('/').pop(); // Extract token from resetLink
      navigate(`/reset-password/${token}`);

    } catch (error) {
      setMessage('Error sending password reset email');
    }
  };

  return (
    <div className='divs'>
      <h2>Request Password Reset</h2>
      <form onSubmit={handleRequestReset}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Request Password Reset</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestPasswordReset;
