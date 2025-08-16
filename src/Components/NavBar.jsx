import { Link, NavLink } from "react-router";
import { FaSignInAlt, FaBars } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import WebLogo from "../Shared/WebLogo";
import LogInButton from "../Shared/LogInButton";
import LogOutButton from "../Shared/LogOutButton";
import { FiLayout } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import ThemeToggleButton from "../Utilities/ThemeToggleButton";

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const mobileRef = useRef(null);
  const { currentUser: user } = useAuth();
  const navLinks = (
    <>
      <li>
        <NavLink
          className=" text-lg"
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className=" text-lg"
          to="/apartment"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Apartment
        </NavLink>
      </li>
    </>
  );

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-base-200 shadow shadow-base-300">
      <div className="navbar max-w-screen mx-auto lg:px-20  px-2">
        {/* Left: Logo + Mobile Menu */}
        <div className="flex-1 flex items-center">
          {/* Hamburger for mobile */}
          <div className="lg:hidden" ref={mobileRef}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-circle"
            >
              <FaBars className="text-primary" />
            </button>
            {isMobileMenuOpen && (
              <ul className="menu menu-sm absolute mt-2 p-2 shadow bg-base-300 rounded-box w-52 z-50">
                {navLinks}
              </ul>
            )}
          </div>

          {/* Logo + Title */}
          <WebLogo></WebLogo>
        </div>

        {/* Right: Nav Links + Profile/Login */}
        <div className="flex-none flex items-center gap-4">
          {/* Desktop nav links */}
          <ul className="menu menu-horizontal px-1 hidden lg:flex gap-2">
            {navLinks}
          </ul>

          {/* Auth/Profile section */}
          <div ref={profileRef}>
            {!user ? (
              <div className="flex justify-between items-center gap-2">
                <LogInButton></LogInButton>{" "}
                <ThemeToggleButton></ThemeToggleButton>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="btn btn-ghost btn-circle avatar w-16"
                >
                  <div className="w-full rounded-full">
                    <img src={user?.photoURL} alt="Profile" />
                  </div>
                </button>
                <ThemeToggleButton></ThemeToggleButton>
                {isProfileOpen && (
                  <ul className="menu absolute right-0 mt-2 p-3 shadow bg-base-300 border-base-300 rounded-box w-52 z-50">
                    <li className="pointer-events-none text-lg font-bold text-primary">
                      {user.displayName}
                    </li>
                    <li>
                      <Link
                        className="text-lg"
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiLayout></FiLayout>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <LogOutButton
                        className={"text-lg font-normal"}
                        onClick={() => setIsProfileOpen(false)}
                      ></LogOutButton>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
