import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Popover } from '@headlessui/react'; // Importing Popover from Headless UI

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Toggle popover when the user icon is clicked
  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between items-center">
      <div className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-xl ${isActive ? 'font-bold border-b-2 border-white' : 'hover:text-black hover:font-bold'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            `text-xl ${isActive ? 'font-bold border-b-2 border-white' : 'hover:text-black hover:font-bold'}`
          }
        >
          Leaderboard
        </NavLink>
      </div>

      {user ? (
        <div className="flex items-center gap-4 relative">
          <span>Welcome, {user.data.firstName}</span>
          
          {/* User Icon */}
          <button onClick={togglePopover} className="bg-gray-600 p-2 rounded-full text-white">
            {user.data.firstName.charAt(0).toUpperCase()}
          </button>

          {/* Popover displaying user details */}
          {isPopoverOpen && (
            <Popover className="absolute top-12 right-0 bg-white text-black p-4 rounded shadow-lg">
              <div className="text-sm">
                <p className="font-bold">{user.data.firstName}</p>
                <p>{user.data.username}</p>
                <p>Points: {user.data.Points}</p>
              </div>
            </Popover>
          )}

          <button onClick={logout} className="bg-red-600 p-1.5 rounded">
            Logout
          </button>
        </div>
      ) : (
        <NavLink to="/login" className="text-white underline">
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
