import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Call logout function from AuthContext
    navigate("/signin"); 
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      <div className="user-info">
        <h3>User Information:</h3>
        {user ? (
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Dashboard;
