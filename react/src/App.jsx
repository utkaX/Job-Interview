import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Home/Dashboard";
import Signup from "./auth/signup";
import Login from "./auth/login";
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
import ManageJobs from "./components/Employer/ManageJobs";
import JobCardDetails from "./components/Employer/JobCardDetails";
import SearchResults from "./components/Home/SearchResults";
import Company from "./components/Company/Company";
import AppliedJobs from "./components/AppliedJobs/AppliedJobs";
import InterviewDetails from "./components/AppliedJobs/InterviewDetails";
import SavedJob from "./components/Home/SavedJob";
import UpdateProfile from "./components/Jobseeker/UpdateProfile";
import Applications from "./components/Employer/Applications";
import JobCandidates from "./components/Employer/JobCandidates";
import CandidateDetails from "./components/Employer/candidateDetails";
import UpdateInterviewDetails from "./components/Employer/UpdateInterviewDetails";
import UserProfile from "./components/Jobseeker/UserProfile";
import InterviewRoom from "./components/InterviewRoom";
import InterviewSchedule from "./components/Employer/InterviewSchedule"; // Fixed typo
import SocketProvider from "./context/Socket";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Add logic to protect routes if necessary
  return children;
}

function App() {
  const location = useLocation();
  const { user } = useAuth();

  // Define all the routes where Navbar should be hidden
  const hideNavAndFooter = [
    "/signup",
    "/login",
    "/verify-otp",
    "/postJob",
    "/employee-dashboard",
    "/employee-profile",
    "/manage-jobs",
    "/job/",
    "/applications", // Ensure consistent casing for paths
    "/jobCandidates/",
    "/candidateDetails/",
    "/update-interview-details/",
    "/interview-schedule",
  ];

  const showMainNavbar = !hideNavAndFooter.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {showMainNavbar && <Navbar />}

      {/* Routes */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/JobDetails/:JobId" element={<JobDetails />} />
        <Route path="/company/:CompanyID" element={<Company />} />
        <Route path="/appliedjobs" element={<AppliedJobs />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route
          path="/interview-details/:AppliedJobId"
          element={<InterviewDetails />}
        />
        <Route path="/saved-jobs" element={<SavedJob />} />
        <Route path="/add-profile" element={<AddProfile />} />
        <Route path="/JobDetails/:JobId/ApplyJob" element={<ApplyJob />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/postJob" element={<PostJob />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-profile" element={<CompanyProfile />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/job/:id" element={<JobCardDetails />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/jobCandidates/:jobId" element={<JobCandidates />} />
        <Route
          path="/candidateDetails/:candidateId"
          element={<CandidateDetails />}
        />
        <Route
          path="/update-interview-details/:id"
          element={<UpdateInterviewDetails />}
        />
        <Route path="/interview-schedule" element={<InterviewSchedule />} />
        <Route path="/interview" element={<InterviewRoom />} />{" "}
        {/* Fixed typo */}
      </Routes>

      {!hideNavAndFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

function Main() {
  return (
    <SocketProvider>
      <Router>
        <App />
      </Router>
    </SocketProvider>
  );
}

export default Main;
