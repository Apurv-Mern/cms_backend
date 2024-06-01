import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../api/baseurl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Cookies from "js-cookie";


import logoGoogle from "../../assets/logoGoogle.svg";

import logoLinkedin from "../../assets/logoLinkedin.svg";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [emailForReset, setEmailForReset] = useState("");

  
  const onSubmit = async (data) => {
    try {
      // Send a POST request to the login endpoint
      const res = await axios.post(`${baseUrl}/api/auth/login`, data);

      const { token } = res.data.data;

      Cookies.set("token", token, {
        expires: 1, // 1 day expiration
        sameSite: "strict",
      });

      const response = await axios.get(`${baseUrl}/api/user/`);
      const users = response.data.data;

      // Check if the user exists in the database
      const user = users.find((user) => user.email === data.email);

      console.log(user.password);
      console.log(user.roleName);

      if (user) {
        // Email exists, check the role
        navigate("/dashboard");
        // if (user.roleName === "user") {
        //   navigate("/users/create");
        // } else if (user.roleName === "admin") {
        //   navigate("/admin/users");
        // } else if (user.roleName === "manager") {
        //   navigate("/admin/users");
        // }
      } else {
        setLoginError("user does not exist");
      }
      console.log(data.email);
      reset();
    } catch (error) {
      setLoginError("user does not exist");
    }
  };
  console.log("emailForReset:", emailForReset);
  const handleRequestPasswordReset = () => {
    navigate("/request-password-reset", { state: { email: emailForReset } });
  };
 const handleGoogleLogin=()=>{
  window.open("http://localhost:4044/auth/google/callback", "_self");
 }
 const handleLinkedinLogin=()=>
  {
    window.open("http://localhost:4044/auth/linkedin/callback", "_self");
  }
  return (
    <div className="containers">
      <div className="login-container">
  
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />{" "}
            {errors.email && !loginError && (
              <span className="error-message">{errors.email.message}</span>
            )}
            {loginError && <span className="error-message">{loginError}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <br></br>
          <button className="login-btn" onClick={handleRequestPasswordReset}>
           Forgot Password?
          </button>
        </form>
        <p>
         ---------------------- or ---------------------------
        </p>
     
        <div className="center">
      <button className="google-btn" onClick={handleGoogleLogin}>
      <img
          src={logoGoogle}
          height="50px"
          width="50px"
          alt="Google logo"
        />
      Login with Google</button>
    </div>
    <div className="center">
      <button className="linkedin-btn" onClick={handleLinkedinLogin}>
      <img
          src={logoLinkedin}
          height="50px"
          width="50px"
          alt="Linkedin logo"
        />
      Login with Linkedin</button>
    </div>


    </div>

    </div>
  );
};

export default Login;
