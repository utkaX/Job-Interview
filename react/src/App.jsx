import {} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Home/Dashboard';
import Signup from "./auth/signup";
import Login from "./Auth/login";
import OtpVerification from "./auth/verifyOtp";
import AddProfile from "./components/AddProfile";
import Notifications from './components/Home/Notifications';
import Footer from './components/Home/Footer';
import Navbar from './components/Home/Navbar';
import JobDetails from './components/Home/JobDetails';
import ApplyJob from './components/Home/ApplyJob';

function App() {
  // console.log(AddProfile);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/Notifications' element={<Notifications/>} />
        <Route path="/add-profile" element={<AddProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/JobDetails/:JobId" element={<JobDetails />} />
        <Route path="/JobDetails/:JobId/ApplyJob" element={<ApplyJob />} />
            
      </Routes>
      <Footer/>
     
    </Router>
  );
}

export default App;
