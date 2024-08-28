import React, { useState } from 'react';
import '../css/login.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to log in');
      }

      setSuccess('Login successful! Redirecting...');
      // Redirect logic here if needed
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Log In</button>
        {error && <div className="form-message error">{error}</div>}
        {success && <div className="form-message success">{success}</div>}
      </form>
    </div>
  );
}

export default Login;
