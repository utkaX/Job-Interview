import {} from "react";
import "../../index.css";
import Logo from "../../common/Logo.jpg";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-red-500 rounded-md m-2">
    <div className="flex items-center justify-between h-20 m-2">
      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="h-16 w-16 border-2 shadow-md shadow-black rounded-lg hover:h-14 hover:w-14 transition-all duration-100"
      />

      {/* Search Bar */}
      <div className="flex flex-grow mx-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow px-4 py-2 ml-20 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            className="px-4 py-2 mr-24 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
          >
            Search
          </button>
        </div>


      {/* Navigation Links */}
      <ul className="flex space-x-4 text-white">
        <li><a href="#home" className="hover:text-gray-200">Home</a></li>
        <li><a href="#notifications" className="hover:text-gray-200">Notifications</a></li>
        <li><a href="#jobs" className="hover:text-gray-200">Jobs</a></li>
        <li><a href="#about" className="hover:text-gray-200">About Us</a></li>
        <li><a href="#profile" className="hover:text-gray-200">Profile</a></li>
      </ul>
    </div>
  </nav>
  );
}
