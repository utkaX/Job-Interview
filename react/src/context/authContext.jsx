import { createContext, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import CompanyProfileReminder from "../components/Employer/CompanyProfileReminder";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [companyProfile, setCompanyProfile] = useState(null); // Holds company profile data
  const [alertShown, setAlertShown] = useState(false); // Track if alert has been shown
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Function to fetch the company profile using fetch
  const fetchCompanyProfile = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/employee/getEmployerByUserId/${userId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setCompanyProfile(null); // Set companyProfile to null if not found
          if (!alertShown) {
            startAlertTimer(); // Start timer if alert not shown yet
          }
          return; // Exit early to avoid executing the next lines
        }
        
        // For other errors (e.g., 500), you can choose to log them or handle them differently
        console.error(`HTTP error! Status: ${response.status}`);
        setCompanyProfile(null); // Set companyProfile to null on error
        return; // Exit early
      }
  
      const data = await response.json(); // Parse the JSON response
      
      if (data && data.company) {
        setCompanyProfile(data.company);
        setAlertShown(false); // Reset alert if company profile is found
      } else {
        setCompanyProfile(null); // No company profile found
        if (!alertShown) {
          startAlertTimer(); // Start timer if alert not shown yet
        }
      }
    } catch (error) {
      console.error("Unexpected error fetching company profile:", error);
      setCompanyProfile(null);
    }
  };
  

  // Function to start alert timer
  const startAlertTimer = () => {
    const timer = setTimeout(() => {
      alert("You have to fill up the company profile."); // Show alert after 5 minutes
      setAlertShown(true); // Prevent showing alert again until profile check
    },300000); // 5 minutes in milliseconds

    // Clear timeout if the component unmounts or user changes
    // return () => clearTimeout(timer);
  };

  const updateAuth = (user, token) => {
    setUser(user);
    setToken(token);
    setIsLoggedIn(true);
    setCompanyProfile(null); // Reset company profile state
    fetchCompanyProfile(user._id); // Fetch company profile
  };

  const logout = () => {
    setUser(null);
    setToken('');
    setCompanyProfile(null);
    setIsLoggedIn(false); // Reset login state
  };

  // Effect to fetch company profile whenever user changes
  useEffect(() => {
    if (user) {
      fetchCompanyProfile(user._id); // Fetch profile on user change
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, companyProfile, isLoggedIn, logout, updateAuth }}>
      {children}
      <CompanyProfileReminder /> {/* This component can utilize the context to show alerts */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
