import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { logout, selectUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center px-6 py-3 relative">

          {/* LEFT - LOGO */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            HavellyRide
          </Link>

          {/* CENTER MENU */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-10">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/create-ride" className="hover:text-blue-600">Create Ride</Link>
            <Link to="/my-rides" className="hover:text-blue-600">My Rides</Link>
            <Link to="/joined-rides" className="hover:text-blue-600">Joined Rides</Link>
          </div>

          {/* RIGHT USER */}
          <div className="hidden lg:flex ml-auto items-center gap-4">
            {user ? (
              <>
                <span className="font-medium">{user?.name}</span>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="ml-auto lg:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col p-4 gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/create-ride" onClick={() => setMenuOpen(false)}>Create Ride</Link>
          <Link to="/my-rides" onClick={() => setMenuOpen(false)}>My Rides</Link>
          <Link to="/joined-rides" onClick={() => setMenuOpen(false)}>Joined Rides</Link>

          <hr />

          {user ? (
            <>
              <span className="font-medium">{user?.name}</span>
              <Button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button className="bg-blue-600 text-white py-2 rounded-lg">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-40"
        />
      )}
    </>
  );
};

export default Navbar;