import { Link, NavLink } from "react-router";
import { FaSignInAlt, FaBars } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import houseLogo from "../assets/home-logo.png";

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  // Dummy user
  const user = {
    displayName: "John Doe",
    photoURL: "/default-avatar.png",
  };
  //   const user = null;

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
    <div className="bg-secondary shadow shadow-base">
      <div className="navbar max-w-screen mx-auto lg:px-20  px-2">
        {/* Left: Logo + Mobile Menu */}
        <div className="flex-1 flex items-center gap-2">
          {/* Hamburger for mobile */}
          <div className="lg:hidden" ref={mobileRef}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-circle"
            >
              <FaBars />
            </button>
            {isMobileMenuOpen && (
              <ul className="menu menu-sm absolute mt-2 p-2 shadow bg-base-100 rounded-box w-52 z-50">
                <li>
                  <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/apartment"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Apartment
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src={houseLogo} alt="Logo" className="w-8 h-8 text-rose-600" />
            <span className="hidden sm:inline text-primary">My Building</span>
          </Link>
        </div>

        {/* Right: Nav Links + Profile/Login */}
        <div className="flex-none flex items-center gap-4">
          {/* Desktop nav links */}
          <ul className="menu menu-horizontal px-1 hidden lg:flex gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/apartment">Apartment</NavLink>
            </li>
          </ul>

          {/* Auth/Profile section */}
          <div ref={profileRef}>
            {!user ? (
              <Link to="/login" className="btn btn-sm btn-outline">
                <FaSignInAlt className="text-lg" /> Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} alt="Profile" />
                  </div>
                </button>
                {isProfileOpen && (
                  <ul className="menu absolute right-0 mt-2 p-3 shadow bg-base-100 rounded-box w-52 z-50">
                    <li className="pointer-events-none text-lg font-bold">
                      {user.displayName}
                    </li>
                    <li>
                      <Link to="/" onClick={() => setIsProfileOpen(false)}>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button onClick={() => setIsProfileOpen(false)}>
                        Logout
                      </button>
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
