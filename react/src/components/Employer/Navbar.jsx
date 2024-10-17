import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "../../Common/Logo.png";
import Event from "./Event";
import Interview from "./Interview";
import Applications from "./Applications";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user from auth context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Function to toggle dropdown visibility immediately
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Call logout function from auth context
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-300 py-4 shadow-lg w-full ">
      <div className="flex items-center justify-between h-16 ml-6 p-2">
        <img
          src={Logo}
          alt="Logo"
          className="h-16 w-16 shadow-md shadow-black rounded-lg hover:h-14 hover:w-14 transition-all duration-200"
        />

        <ul className="flex space-x-8 text-black">
          <li>
            <Link
              to="/employee-dashboard"
              className="navButton text-lg font-semibold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link to="#" className="navButton text-lg font-semibold">
              {<Event />}
            </Link>
          </li>
          <li>
            <Link className="navButton text-lg font-semibold">
              {<Interview />}
            </Link>
          </li>
          <li>
            <Link to="/Applications" className="navButton text-lg font-semibold">
              Applications
            </Link>
          </li>
          <li>
            <button className="navButton text-lg font-semibold text-black">
              About Us
            </button>
          </li>
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="navButton text-lg font-semibold"
            >
              <div className="col bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text text-xl font-bold">
                {user.email}
              </div>
            </button>

            {/* Dropdown menu with slide effect */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg transition-transform duration-300 ease-in-out transform ${
                isDropdownOpen ? "translate-y-0" : "-translate-y-4 opacity-0"
              }`}
              style={{ visibility: isDropdownOpen ? "visible" : "hidden" }} // Control visibility
            >
              <ul className="py-1">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
