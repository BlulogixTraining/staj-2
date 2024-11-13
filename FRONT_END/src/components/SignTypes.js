import React, { useState } from 'react';
import '/workspaces/staj-2/FRONT_END/src/styles/SignTypes.css';

const SignTypes = () => {
  // State for storing user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign In and Sign Up

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple front-end validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Mock sign-up process (replace with your API call)
      try {
        // Reset error message
        setError('');

        // Simulate a sign-up API call
        console.log('Signing up with:', { email, password });

        // For example, after successful sign-up
        alert('Signed up successfully!');
        setIsSignUp(false); // Switch to sign-in mode after successful sign-up
      } catch (err) {
        setError('Failed to sign up');
      }
    } else {
      // Mock sign-in process (replace with your API call)
      try {
        // Reset error message
        setError('');

        // Simulate a sign-in API call
        console.log('Signing in with:', { email, password });

        // For example, after successful sign-in
        alert('Signed in successfully!');
        // Redirect or perform other actions upon successful sign-in here
      } catch (err) {
        setError('Failed to sign in');
      }
    }
  };

  return (
    <div className="sign-container">
      <h1>Blulogix CRM</h1>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {isSignUp && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>

        <p>
          {isSignUp
            ? 'Already have an account?'
            : "Don't have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(''); // Clear error on mode switch
            }}
            className="toggle-button"
          >
            {isSignUp ? 'Sign In' : 'Sign Up now'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignTypes;