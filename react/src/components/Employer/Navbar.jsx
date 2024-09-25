import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../Common/Logo.jpg"
import Event from './Event'
import Interview from './Interview'
import Profile from './Profile'
import Applications from './Applications'

const Navbar = () => {
  return (
        <nav className="bg-gray-300 py-4 shadow-lg">
      <div className="flex items-center justify-between h-16 ml-6 mr-4">
        <img
          src={Logo}
          alt="Logo"
          className="h-16 w-16 shadow-md shadow-black rounded-lg hover:h-14 hover:w-14 transition-all duration-200"
        />
    
        <ul className="flex space-x-8 text-black">
          <li>
            <Link to="/employee-dashboard" className="navButton text-lg font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Event" className="navButton text-lg font-semibold">
              {<Event/>}
            </Link>
          </li>
          <li>
            <Link className="navButton text-lg font-semibold">
              {<Interview/>}
            </Link>
          </li>
          <li>
            <Link className="navButton text-lg font-semibold">
              {<Applications/>}
            </Link>
          </li>
          <li>
            <button className="navButton text-lg font-semibold text-black">
              About Us
            </button>
          </li>
          <li>
            <Link to="/#" className="navButton text-lg font-semibold">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar