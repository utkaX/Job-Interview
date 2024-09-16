import  { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import '../css/otp.css';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { email, password, role } = location.state || {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to verify OTP');
      }

      setSuccess('OTP verified successfully! Account created.');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="otp-verification-container">
      <h1>Verify OTP</h1>
      <form onSubmit={handleSubmit} className="otp-verification-form">
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Verify OTP</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
    </div>
  );
}

export default OtpVerification;
