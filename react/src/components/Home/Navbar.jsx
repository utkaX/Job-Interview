import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaBell, FaBookmark } from "react-icons/fa"; // Notification and Saved Jobs icons
import "../../index.css";
import Logo from "../../common/Logo.png";
import { useAuth } from "../../context/authContext";

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAuth(); // Get the user and logout from auth context
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const handleScrollToAbout = () => {
    const element = document.getElementById("about-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

  return (
    <nav className="bg-gray-100 py-4 shadow-lg">
      <div className="flex items-center justify-between h-16 ml-6 mr-4">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="h-24 w-24 rounded-l"
          onClick={() => navigate("/")} // Redirect to homepage when logo is clicked
        />

        {/* Links */}
        <ul className="flex space-x-8 text-black">
          <li>
            <Link to="/" className="navButton text-lg font-semibold">
              Home
            </Link>
          </li>

          {/* Conditionally render "Applied Jobs" link only if user is logged in */}
          {isLoggedIn && (
            <li>
              <Link
                to="/appliedjobs"
                className="navButton text-lg font-semibold"
              >
                Applied Jobs
              </Link>
            </li>
          )}

          <li>
            <button
              onClick={handleScrollToAbout}
              className="navButton text-lg font-semibold text-black"
            >
              About Us
            </button>
          </li>
        </ul>

        <div className="flex items-center space-x-6">
          {/* Saved Jobs Icon - left side of the notification icon */}
          <Link
            to="/saved-jobs"
            className="text-gray-800 hover:text-blue-500 transition"
          >
            <FaBookmark size={22} /> {/* Saved Jobs icon */}
          </Link>

          {/* Notification Icon */}
          <Link
            to="/Notifications"
            className="text-gray-800 hover:text-blue-500 transition"
          >
            <FaBell size={22} /> {/* Notification bell icon */}
          </Link>

          {/* Profile Picture and Dropdown */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="focus:outline-none">
                <img
                  src={user?.profilePicture || "https://via.placeholder.com/40"} // Replace with actual profile picture
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-gray-300 shadow-sm hover:shadow-md transition-all"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout} // Call the handleLogout function
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
            // Login Button (Replaced Link with button)
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
