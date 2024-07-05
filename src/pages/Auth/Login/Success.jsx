import React, { useEffect } from "react";
import axios from "axios";

const Success = () => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4044/api/authentication/user",
        { withCredentials: true }
      );
      console.log("User:", response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // navigate("/dashboard");
    } catch (error) {
      // console.error("Error fetching user:", error);
      // navigate("/");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  console.log("gerlasdhfkasdlbnfdflkdasfhkuj");

  return (
    <div>
      <h1>Redirecting to GitHub for login...</h1>
    </div>
  );
};

export default Success;
