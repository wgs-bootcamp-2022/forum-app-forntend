import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

const Navbar = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showForumBoard, setShowForumBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_SUPERADMIN"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowForumBoard();
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setShowForumBoard(false)
    }
  }, [currentUser]);
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
      Forum App
      </Link>

      <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/home"} className="nav-link">
          Home
        </Link>
      </li>

      {showModeratorBoard && (
        <li className="nav-item">
          <Link to={"/superadmin"} className="nav-link">
            Super Admin Board
          </Link>
        </li>
      )}

      {showAdminBoard && (
        <li className="nav-item">
          <Link to={"/admin"} className="nav-link">
            Admin Board
          </Link>
        </li>
      )}
      {showForumBoard && (
        <li className="nav-item">
          <Link to={"/forums"} className="nav-link">
            Forum Board
          </Link>
        </li>
      )}
      {showForumBoard && (
        <li className="nav-item">
          <Link to={`/profile/details/${currentUser.id}`} className="nav-link">
            Profil
          </Link>
        </li>
      )}
      </div>

      {currentUser && (
        
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/forums"} className="nav-link">
            Forum
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/profile/details/${currentUser.id}`} className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link" onClick={logOut}>
            Log Out
          </a>
        </li>
      </div>
      )}
      {currentUser ? (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/forums"} className="nav-link">
            {/* {currentUser.name} */}
          </Link>
        </li>
        {/* <li className="nav-item">
          <a href="/login" className="nav-link" onClick={logout}>
            LogOut
          </a>
        </li> */}
      </div>
      ) : (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/register"} className="nav-link">
            Sign Up
          </Link>
        </li>
      </div>
      )}
      </nav>
    )
}

export default Navbar;