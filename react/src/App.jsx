import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Home/Dashboard";
import Signup from "./auth/signup";
import Login from "./auth/login";
// import OtpVerification from "./auth/verifyOtp";
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
import ManageJobs from "./components/Employer/ManageJobs";
import Sidebar from "./components/Employer/Sidebar";
import JobCardDetails from "./components/Employer/JobCardDetails";
import SearchResults from "./components/Home/SearchResults";
import Company from "./components/Company/Company";
import AppliedJobs from "./components/AppliedJobs/AppliedJobs";

function App() {
  const location = useLocation();
  const { user } = useAuth();

  const isEmployer = user && user.role === "employer";
  const isJobSeeker = user && user.role === "job_seeker";

  const hideNavAndFooter = [
    "/signup",
    "/login",
    "/verify-otp",
    "/employee-dashboard",
    "/employee-profile",
  ];

  const sideBar = ["/signup", "/login", "/verify-otp", "/employee-dashboard"];

  return (
    <>
      {!hideNavAndFooter.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/verify-otp" element={<OtpVerification />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/JobDetails/:JobId" element={<JobDetails />} />
        <Route path="/company/:CompanyID" element={<Company />} />
        <Route path="/appliedjobs" element={<AppliedJobs />} />
        <Route path="/Notifications" element={<Notifications />} />

        {/* Protected Routes for Job Seeker */}
        {isJobSeeker && (
          <>
            <Route path="/add-profile" element={<AddProfile />} />
            <Route path="/JobDetails/:JobId/ApplyJob" element={<ApplyJob />} />
          </>
        )}

        {/* Protected Routes for Employer */}
        {isEmployer && (
          <>
            \{/* { <Sidebar/>} */}
            {/* <Route path="/PostJob" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
            <Route path="/employee-dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
            <Route path="/employee-profile" element={<ProtectedRoute><CompanyProfile /></ProtectedRoute>} />
            <Route path="/manage-jobs" element={<ProtectedRoute><ManageJobs /></ProtectedRoute>}/> */}
            {/* <Navbar/> */}
            <Route path="/PostJob" element={<PostJob />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee-profile" element={<CompanyProfile />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/job/:id" element={<JobCardDetails />} />
          </>
        )}

        {/* Redirect unauthenticated users to login */}
        <Route
          path="*"
          element={
            <Navigate
              to={user ? (isEmployer ? "/employee-dashboard" : "/") : "/login"}
            />
          }
        />
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
