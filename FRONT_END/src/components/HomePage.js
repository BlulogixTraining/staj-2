import React from 'react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Blulogix CRM App</h1>
        <div className="space-x-4">
          <button 
            onClick={() => navigate('/signin')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>

          <p>Don't have an account?</p>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;