import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userData, logout, userID } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = userData || userID;

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-300 px-4 sm:px-10 md:px-14 lg:px-36 py-4 mb-10">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-secondary hover:text-secondary-100">
          TaskManager
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center text-secondary">
          <Link to="/view-task" className="hover:text-secondary-100">View Tasks</Link>
          {isLoggedIn && (
            <Link to="/add-task" className="hover:text-secondary-100">Add Task</Link>
          )}
          {userID ? (
            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-secondary text-white px-5 py-2 rounded-full hover:bg-secondary-100"
            >
              Sign Up
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-700">
          <Link to="/view-task" onClick={() => setMobileMenuOpen(false)}>
            View Tasks
          </Link>
          {userID && (
            <Link to="/add-task" onClick={() => setMobileMenuOpen(false)}>
              Add Task
            </Link>
          )}
          {userID ? (
            <button
              onClick={() => {
                logoutHandler();
                setMobileMenuOpen(false);
              }}
              className="bg-red-500 text-white px-5 py-2 rounded-full"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-secondary text-white px-5 py-2 rounded-full"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
