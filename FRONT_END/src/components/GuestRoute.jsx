import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If the user is logged in, redirect to /dashboard
  return user ? <Navigate to="/dashboard" /> : children;
};

export default GuestRoute;
