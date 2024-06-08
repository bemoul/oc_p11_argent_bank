import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoAgency from "../../assets/img/argentBankLogo.webp";
import { logout } from "../../reducers/authSlice";

/**
 * Displays the header with navigation links.
 * Shows user options if logged in, otherwise shows sign-in option.
 * 
 * @returns {JSX.Element} Header Component
 */

export const Header = () => {
  const dispatch = useDispatch();
  const { currentUser, firstName } = useSelector((state) => state.auth);

  // Handles user logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logoAgency} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-links">
        {currentUser ? (
          <>
            <NavLink to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </NavLink>
            <NavLink to="/" className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};
