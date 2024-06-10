import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../api/baseurl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Cookies from "js-cookie";

import logoGoogle from "../../../assets/logoGoogle.svg";
import logoGithub from "../../../assets/logoGithub.svg";
import logoFacebook from "../../../assets/logoFacebook.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [emailForReset, setEmailForReset] = useState("");
  console.log("wsddgasfsdafsda", emailForReset);
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

      if (user) {
        localStorage.setItem("user-details", JSON.stringify(user));
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
        toast.error("User does not exist");
      }

      reset();
    } catch (error) {
      setLoginError("Login failed");
      toast.error("Login failed");
    }
  };

  const handleRequestPasswordReset = () => {
    navigate("/request-password-reset", { state: { email: emailForReset } });
  };

  // console.log("djfhidhf", emailForReset);
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setValue("email", emailValue); // Set value in React Hook Form
    setEmailForReset(emailValue); // Set local state value if needed
  };
  const handleGoogleLogin = () => {
    window.open("http://localhost:4044/auth/google/callback", "_self");
  };
  const handleGithubLogin = () => {
    window.open("http://localhost:4044/auth/github/callback", "_self");
  };
  const handleFacebookLogin = () => {
    window.open("http://localhost:4044/auth/linkedin/callback", "_self");
  };
  useEffect(() => {
    // Check if the token exists in cookies
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
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
              onChange={handleEmailChange}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />{" "}
            {/* <input  name="emailForReset"
              value={emailForReset}
              onChange={handleEmailChange}/> */}
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

          <button className="login-btn" onClick={handleRequestPasswordReset}>
            Forgot Password?
          </button>
        </form>
        <p>---------------------- or ---------------------------</p>

        <div className="center">
          <button className="google-btn" onClick={handleGoogleLogin}>
            <img
              src={logoGoogle}
              height="50px"
              width="50px"
              alt="Google logo"
            />
            Login with Google
          </button>
        </div>
        <div className="center">
          <button className="github-btn" onClick={handleGithubLogin}>
            <img
              src={logoGithub}
              height="50px"
              width="50px"
              alt="Github logo"
            />
            Login with Github
          </button>
        </div>
        <div className="center">
          <button className="facebook-btn" onClick={handleFacebookLogin}>
            <img
              src={logoFacebook}
              height="50px"
              width="50px"
              alt="Facebook logo"
            />
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
