import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-indigo-600 shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand Name */}
        <a href="/" className="text-white text-xl font-bold">InstaDownloader</a>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <ul className={`md:flex md:space-x-6 bg-indigo-700 md:bg-transparent ${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 w-full md:w-auto md:mt-0 space-y-2 md:space-y-0 py-4 md:py-0 px-4 md:px-0 z-40`}>
          <li>
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) =>
              `${isActive ? "bg-green-500 text-white" : "text-white"} flex items-center justify-center hover:bg-indigo-500 transition px-4 py-2 rounded text-sm`
            }>Home</NavLink>
          </li>
          <li>
            <NavLink to="/instagram-reel-download" onClick={closeMenu} className={({ isActive }) =>
              `${isActive ? "bg-green-500 text-white" : "text-white"} flex items-center justify-center hover:bg-indigo-500 transition px-4 py-2 rounded text-sm`
            }>Instagram Reel Download</NavLink>
          </li>
          
          <li>
            <NavLink to="/story-download" onClick={closeMenu} className={({ isActive }) =>
              `${isActive ? "bg-green-500 text-white" : "text-white"} flex items-center justify-center hover:bg-indigo-500 transition px-4 py-2 rounded text-sm`
            }>Story Download</NavLink>
          </li>
          <li>
            <NavLink to="/post-download" onClick={closeMenu} className={({ isActive }) =>
              `${isActive ? "bg-green-500 text-white" : "text-white"} flex items-center justify-center hover:bg-indigo-500 transition px-4 py-2 rounded text-sm`
            }>Post Download</NavLink>
          </li>
          <li>
            <NavLink to="/profile-picture-download" onClick={closeMenu} className={({ isActive }) =>
              `${isActive ? "bg-green-500 text-white" : "text-white"} flex items-center justify-center hover:bg-indigo-500 transition px-4 py-2 rounded text-sm`
            }>Profile Picture Download</NavLink>
          </li>
          <li>
            <NavLink to="/instagram-information" onClick={closeMenu} className={({ isActive }) =>
              `${isActive ? "bg-green-500 text-white" : "text-white"} flex items-center justify-center hover:bg-indigo-500 transition px-4 py-2 rounded text-sm`
            }>Instagram Information Download</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
