import React from "react";
import { useNavigate } from "react-router-dom";

const AuthButtons = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // Handle button clicks for navigation
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <p className="mb-4 text-lg text-gray-600">
        {isLoggedIn
          ? "You are logged in."
          : "Please log in to see your this page."}
      </p>
      {!isLoggedIn && (
        <div className="flex space-x-4">
          <button
            onClick={handleLoginClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={handleSignUpClick}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
