import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('job_seeker');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/sendOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      setSuccess('OTP sent successfully! Please check your email.');
      navigate('/verify-otp', { state: { email, password, role } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-heading">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
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
        <div className="form-group">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            id="role"
            className="form-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="job_seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <button type="submit" className="form-button">Sign Up</button>
        {error && <div className="form-message error">{error}</div>}
        {success && <div className="form-message success">{success}</div>}
      </form>
    </div>
  );
}

export default Signup;
