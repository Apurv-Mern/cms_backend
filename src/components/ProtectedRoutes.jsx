import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");

  // if (!token) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default ProtectedRoute;
