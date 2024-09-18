import { Link } from "react-router-dom";
import "../../index.css";
import Logo from "../../common/Logo.jpg";
import Notifications from "./Notifications";
import Jobs from "./Jobs";

export default function Navbar() {
  const handleScrollToAbout = () => {
    const element = document.getElementById("about-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          <li><Link to="/" className="navButton">Home</Link></li>
          <li><Link to="/Notifications" className="navButton">{<Notifications />}</Link></li>
          <li><Link to="/Jobs" className="navButton">{<Jobs />}</Link></li>
          <li><button onClick={handleScrollToAbout} className="navButton">About Us</button></li>
          <li><Link to="#profile" className="navButton">Profile</Link></li>
        </ul>
      </div>
    </nav>
  );
}
