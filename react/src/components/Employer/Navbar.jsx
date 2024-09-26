import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from "../../Common/Logo.jpg"
import Event from './Event'
import Interview from './Interview'
import Profile from './Profile'
import Applications from './Applications'
import { useAuth } from '../../context/authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const Navbar = () => {
  const {user,logout}=useAuth()
  // console.log(user._id)

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  

  // console.log(user)
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
            <Link to="#" onClick={toggleDropdown}  className="navButton relative inline-block text-blue-900 hover:text-blue-500 text-lg font-semibold">
              {user.email}
              <FontAwesomeIcon className='ml-2' icon={faChevronDown} />
            </Link>
          </li>
        </ul>
        <div
        className={`mt-44 absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg transition-all duration-300 ease-in-out transform ${
          dropdownVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul className="py-1">
          <li>
            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </Link>
          </li>
          <li>
            <Link onClick={logout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Logout
            </Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  )
}

export default Navbar