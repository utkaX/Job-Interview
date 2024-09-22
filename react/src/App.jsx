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
import {useAuth} from "./context/authContext"
import { Navigate } from "react-router-dom";
import PostJob from "./components/Employer/PostJob";



function App() {
  const hideNavAndFooter = ["/signup", "/login", "/verify-otp","/employee-dashboard"];
  const location = useLocation();
  const user=useAuth()

  return (

      <>
        {!hideNavAndFooter.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/JobDetails/:JobId" element={<JobDetails />} />
          <Route path="/JobDetails/:JobId/ApplyJob" element={<ApplyJob />} />
          <Route path="/verify-otp" element={<OtpVerification />} />


          <Route path="/PostJob" element={<PostJob/>}/>
          <Route path="/employee-dashboard" element={<EmployeeDashboard/>} />
          <Route path="/employee-profile" element={<CompanyProfile />} />
         

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
