import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SignIn.css';
import '../../styles/SignUp.css';
import { AuthContext } from '../../context/AuthContext.js'

const SignUp = () => {
  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    const response = await signup(username, email, password, confirmPassword);

    if (response.success) {
      setSuccess(response.message);
      setTimeout(() => navigate("/signin"), 2000); // Redirect after 2 seconds
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="content">
        <h2>Create Your Account</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
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
