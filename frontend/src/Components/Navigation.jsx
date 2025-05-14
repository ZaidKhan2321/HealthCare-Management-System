import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/actions/User.js";
import { FaUserCircle } from "react-icons/fa";
import { FaUserMd } from 'react-icons/fa';
import './CSS/Navigation.css';

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar">
      <nav className="navbar__nav d-flex justify-content-between align-items-center px-3">
        <div className="d-flex align-items-center">
          <NavLink to="/" className="navbar__brand">
            HMS
          </NavLink>
          <ul className="navbar__links d-flex align-items-center mb-0" style={{ listStyle: "none" }}>
            {!userInfo && (
              <>
                <li>
                  <NavLink to="/signin" className="navbar__link">
                    <button className="navbar__link btn btn-info mx-2">Sign In</button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="navbar__link">
                    <button className="navbar__link btn btn-info mx-2">Sign Up</button>
                  </NavLink>
                </li>
              </>
            )}
            {userInfo && (
              <>
                <li>
                  <NavLink to="/" className="navbar__link">
                    <button className="navbar__link btn btn-info mx-2">Home</button>
                  </NavLink>
                </li>
                <li>
                </li>
              </>
            )}
            {userInfo?.role === 2 && (
              <li>
                <NavLink to="/my-prescriptions" className="navbar__link">
                  <button className="navbar__link btn btn-warning">My Prescriptions</button>
                </NavLink>
              </li>
            )}
            {(!userInfo || userInfo.role === 2) && (
              <li>
                <NavLink to="/find-doctor" className="navbar__link">
                  <button className="navbar__link btn btn-success">Find a Doctor</button>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        {/* Right: Profile */}
        <div className="d-flex align-items-center">
          {userInfo?.role === 2 && (<>
            <NavLink to="/patient-profile" className="navbar__profile-link d-flex align-items-center" title="Profile">
              <FaUserCircle size={28} style={{ marginRight: 6 }} />
              <span className="d-none d-md-inline">Profile</span>
            </NavLink>
          </>)}
          {userInfo?.role === 1 && (
            <li className="ms-auto">
              <NavLink to="/doctor-profile" className="navbar__profile-link d-flex align-items-center" title="Profile">
                <FaUserMd size={28} style={{ marginRight: 6 }} />
                <span className="d-none d-md-inline">Profile</span>
              </NavLink>
            </li>
          )}
          {userInfo && (
          <button className="navbar__link btn btn-secondary mx-2" onClick={handleLogout}>
            Logout
          </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;


// ...
