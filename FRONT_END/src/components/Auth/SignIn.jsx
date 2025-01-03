import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SignIn.css';

// Utility functions for validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Password must be at least 6 characters and include a number
  const passwordRegex = /^(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

export const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(''); // Clear errors on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Invalid email format. Example: user@example.com');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long and include at least one number.');
      return;
    }

    // Proceed to sign in
    console.log('Sign In Data:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="sign-in-wrapper">
      {/* Side Banner */}
      <div className="side-banner">
        <h1>Your place to work.
        </h1>
        <h1>Plan, Create, and Control</h1>
        <p>Sign in to access your dashboard and manage your account.</p>
      </div>

      {/* Sign-In Form */}
      <div className="sign-in-container">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="SignIn_button">Sign In</button>
        </form>
        <p>
          Don’t have an account?{' '}
          <button className="SignUp_button" onClick={() => navigate('/signup')}>
            Sign Up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
