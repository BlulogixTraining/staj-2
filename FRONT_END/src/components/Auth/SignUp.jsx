import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SignIn.css';
import '../../styles/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Form Submitted:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="sign-up-container">
      <div className="content">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
