import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Home/Dashboard';
import Signup from "./auth/signup";
import Login from "./auth/login";
import OtpVerification from "./auth/verifyOtp";
import AddProfile from "./components/Jobseeker/AddProfile"; 
import CompanyProfile from "./components/Employer/CompanyProfile"; 
import Notifications from './components/Home/Notifications'; 
import Footer from './components/Home/Footer'; 
import Navbar from './components/Home/Navbar'; 
import JobDetails from './components/Home/JobDetails'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/Notifications' element={<Notifications />} />
        <Route path="/add-profile" element={<AddProfile />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/JobDetails/:JobId" element={<JobDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
