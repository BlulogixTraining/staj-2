import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Unauthorized from '../components/Unauthorized';

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Wait until the user is loaded before rendering
  useEffect(() => {
    // If the user is not an admin, navigate to unauthorized or another page
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/unauthorized');  // or any other route you want to redirect to
    }
  }, [user, loading, navigate]); // Ensure this effect runs when user or loading changes

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (!user || user.role !== 'admin') {
    return <Unauthorized />; // You can render Unauthorized directly here if needed
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Your admin dashboard content goes here */}
    </div>
  );
};

export default AdminDashboard;
