import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Home/Dashboard";
import Signup from "./auth/signup";
import Login from "./auth/login";
import OtpVerification from "./auth/verifyOtp";
import AddProfile from "./components/Jobseeker/AddProfile";
import Notifications from "./components/Home/Notifications";
import Footer from "./components/Home/Footer";
import Navbar from "./components/Home/Navbar";
import JobDetails from "./components/Home/JobDetails";
import ApplyJob from "./components/Home/ApplyJob";
import CompanyProfile from "./components/Employer/CompanyProfile";
import EmployeeDashboard from "./components/Employer/Dashboard";
import PostJob from "./components/Employer/PostJob";
import { useAuth } from "./context/authContext";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./Protected";


function App() {
  const location = useLocation();
  const { user } = useAuth();

  const isEmployer = user && user.role === 'employer';
  const isJobSeeker = user && user.role === 'job_seeker';

  const hideNavAndFooter = [
    "/signup",
    "/login",
    "/verify-otp",
    "/employee-dashboard"
  ];

  return (
    <>
      {!hideNavAndFooter.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerification />} />

        {/* Protected Routes for Job Seeker */}
        {isJobSeeker && (
          <>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/Notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/add-profile" element={<ProtectedRoute><AddProfile /></ProtectedRoute>} />
            <Route path="/JobDetails/:JobId" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
            <Route path="/JobDetails/:JobId/ApplyJob" element={<ProtectedRoute><ApplyJob /></ProtectedRoute>} />
          </>
        )}

        {/* Protected Routes for Employer */}
        {isEmployer && (
          <>
            <Route path="/PostJob" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
            <Route path="/employee-dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
            <Route path="/employee-profile" element={<ProtectedRoute><CompanyProfile /></ProtectedRoute>} />
          </>
        )}

        {/* Redirect unauthenticated users to login */}
        <Route path="*" element={<Navigate to={user ? (isEmployer ? "/employee-dashboard" : "/") : "/login"} />} />
      </Routes>
      {!hideNavAndFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Main;
