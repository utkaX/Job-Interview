import { Link } from "react-router-dom";
import "../../index.css";
import Logo from "../../common/Logo.jpg";
import Notifications from "./Notifications";
import Jobs from "./Jobs";
import { useAuth } from "../../context/authContext"; 

export default function Navbar() {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from auth context

  const handleScrollToAbout = () => {
    const element = document.getElementById("about-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-gray-100 py-4 shadow-lg">
      <div className="flex items-center justify-between h-16 ml-6 mr-4">
        <img
          src={Logo}
          alt="Logo"
          className="h-16 w-16 shadow-md shadow-black rounded-lg hover:h-14 hover:w-14 transition-all duration-200"
        />

        <ul className="flex space-x-8 text-black">
          <li>
            <Link to="/" className="navButton text-lg font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Notifications" className="navButton text-lg font-semibold">
              <Notifications />
            </Link>
          </li>
          <li>
            <Link to="/Jobs" className="navButton text-lg font-semibold">
              <Jobs />
            </Link>
          </li>
          <li>
            <button onClick={handleScrollToAbout} className="navButton text-lg font-semibold text-black">
              About Us
            </button>
          </li>
          <li>
            <Link to="#profile" className="navButton text-lg font-semibold">
              Profile
            </Link>
          </li>
          {!isLoggedIn && ( // Conditionally render the login button
            <li>
              <Link to="/login" className="navButton text-lg font-semibold">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
