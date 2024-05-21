import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { baseUrl } from '../../api/baseurl';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const onSubmit = async (data) => {
    try {
      // Send a POST request to the login endpoint
      const res=await axios.post(`${baseUrl}/api/auth/login`, data);
 
      const { token } = res.data.data;


       Cookies.set('token', token, {
        expires: 1, // 1 day expiration
        sameSite: 'strict'
      });

      const response = await axios.get(`${baseUrl}/api/user/`);
      const users = response.data.data;
      
      // Check if the user exists in the database
      const user = users.find(user => user.email === data.email);
      console.log(user.password);
      
     console.log(user.roleName);
      if (user) {
        // Email exists, check the role
        if (user.roleName === 'user') {
         navigate('/users/create');
        } else if (user.roleName === 'admin') {
          navigate('/admin/users');
        }
        else if(user.roleName==='manager')   {
       navigate('/admin/users');
            }
      } else {
        // Email doesn't exist
        setLoginError('Invalid credentials');
      } } catch (error) {
        console.error('Login error:', error);
        setLoginError('Internal server error');
      }
  };

  return (
    <div className='containers'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })} />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" {...register("password", { required: "Password is required" })} />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          <button type="submit" className="login-btn">Login</button>
      
          <Link to="request-password-reset">Forgot password</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
