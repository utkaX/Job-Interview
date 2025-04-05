import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaBell, FaBookmark } from "react-icons/fa"; // Notification and Saved Jobs icons
import Logo from "../../common/Logo.png"; // Replace with your actual logo path
import { useAuth } from "../../context/authContext";
import config from "../../utils/config";
export default function EmployerNavbar() {
  const { isLoggedIn, logout, user } = useAuth(); // Get the user and logout from auth context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // State for notification count
  const navigate = useNavigate(); // Initialize navigate
  const dropdownRef = useRef(null); // Reference for dropdown menu

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle logout and redirect to homepage
  const handleLogout = () => {
    logout(); // Clear user details and token
    navigate("/"); // Redirect to homepage
  };

  const handleLogin = () => {
    navigate("/login"); // Redirect to login page when login button is clicked
  };

  // Close the dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to increment notification count when a new job is added
  const incrementNotificationCount = () => {
    setNotificationCount((prevCount) => prevCount + 1);
  };

  // UseEffect to fetch notifications count on user login
  useEffect(() => {
    if (isLoggedIn) {
      // Fetch notifications count from your API if user is logged in
      const fetchNotificationsCount = async () => {
        const response = await fetch(
          `${config.baseUrl}/notification/getCount/${user._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setNotificationCount(data.count); // Assuming API returns { count: number }
        }
      };
      fetchNotificationsCount();
    }
  }, [isLoggedIn, user]);

  return (
    <nav className="bg-gray-200 py-4 shadow-lg">
      <div className="flex items-center justify-between h-16 ml-6 mr-4">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="h-24 w-24 rounded-l"
          onClick={() => navigate("/employee-dashboard")} // Redirect to employer dashboard when logo is clicked
        />

        {/* Links */}
        <ul className="flex space-x-8 text-black">
          <li>
            <Link
              to="/employee-dashboard"
              className="navButton text-lg font-semibold"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className="navButton text-lg font-semibold"
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="navButton text-lg font-semibold"
            >
              Candidates
            </Link>
          </li>
          <li>
            <Link
              to="/companyprofile"
              className="navButton text-lg font-semibold"
            >
              Profile
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-6">
          {/* Profile Picture and Dropdown */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="focus:outline-none">
                <img
                  src={
                    user?.profilePicture ||
                    "https://ui-avatars.com/api/?name=Employer&background=0D8ABC&color=fff"
                  } // Replace with actual profile picture
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-gray-300 shadow-sm hover:shadow-md transition-all"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="navButton text-lg font-semibold px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
