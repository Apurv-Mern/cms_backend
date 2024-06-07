import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";

import { baseUrl } from "../../api/baseurl";
import { useForm } from "react-hook-form";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log("dflocation", location);

  const handleRequestReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/request-password-reset`,
        { email }
      );
      console.log(response.data.data);

      // Navigate to reset password page with token
      const token = response.data.data.resetLink.split("/").pop(); // Extract token from resetLink
      navigate(`/reset-password/${token}`);
    } catch (error) {
      setMessage("Error sending password reset email");
    }
  };

  useEffect(() => {
    // Get the state passed via navigate
    const state = location.state;
    if (state && state.email) {
      setEmail(state.email);
      console.log(state.email);
    }
  }, [location.state]);

  return (
    <div className="divs">
      <button onClick={() => navigate(-1)}>
        {" "}
        <ArrowBackIosNewIcon />
      </button>

      <h2>Request Password Reset</h2>
      <form onSubmit={handleRequestReset}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            name="email"
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
