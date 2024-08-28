import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import OtpVerification from './components/verifyOtp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
