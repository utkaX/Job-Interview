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

      <ul className="flex space-x-8 text-white">
        <li><a href="#home" className="navButton">Home</a></li>
        <li><a href="#notifications" className="navButton">Notifications</a></li>
        <li><a href="#jobs" className="navButton">Jobs</a></li>
        <li><a href="#about" className="navButton">About Us</a></li>
        <li><a href="#profile" className="navButton">Profile</a></li>
      </ul>
    </div>
  </nav>
  );
}
