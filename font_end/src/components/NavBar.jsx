import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4 fixed w-full top-0 left-0 z-10">
      <ul className="flex justify-between items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-gray-300' : 'text-white hover:text-gray-300'
            }
          >
            Home
          </NavLink>
        </li>
        <div className="flex space-x-12">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-gray-300' : 'text-white hover:text-gray-300'
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'text-gray-300' : 'text-white hover:text-gray-300'
              }
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/predict"
              className={({ isActive }) =>
                isActive ? 'text-gray-300' : 'text-white hover:text-gray-300'
              }
            >
              Predict Your Sugar Level
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;