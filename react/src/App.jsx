<<<<<<< HEAD
import {} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import OtpVerification from './components/verifyOtp';
import Dashboard from './components/Home/Dashboard';

=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./auth/signup";
import Login from "./auth/login";
import OtpVerification from "./auth/verifyOtp";
import Dashboard from "./components/Dashboard";
import AddProfile from "./components/AddProfile";
>>>>>>> 4d50cfe39884223af17fdfac39274f9d0ccd8cd1

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
<<<<<<< HEAD
        <Route path="/dashboard" element={<Dashboard/>}/>
        {/* Add more routes here */}
=======
>>>>>>> 4d50cfe39884223af17fdfac39274f9d0ccd8cd1
      </Routes>
    </Router>
  );
}

export default App;
