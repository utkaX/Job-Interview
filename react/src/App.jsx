import {} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Home/Dashboard';
import Signup from "./auth/signup";
import Login from "./Auth/login";
import OtpVerification from "./auth/verifyOtp";
import AddProfile from "./components/AddProfile";

function App() {
  console.log(AddProfile);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-profile" element={<AddProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
