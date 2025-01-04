import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Redirect to login if user is not logged in
  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
