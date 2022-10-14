/** @format */

import { menuItems } from "../menuItems";
import MenuItems from "./MenuItems";
import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
const Navbar = () => {
  const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showForumBoard, setShowForumBoard] = useState(false);
  const [showProfilBoard, setShowProfilBoard] = useState(false);

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
      setShowSuperAdminBoard(currentUser.roles.includes("ROLE_SUPERADMIN"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowForumBoard();
      setShowProfilBoard();
    } else {
      setShowSuperAdminBoard(false);
      setShowAdminBoard(false);
      setShowForumBoard(false);
      setShowProfilBoard(false);
    }
  }, [currentUser]);
  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
        {showSuperAdminBoard && <Link to={"/superadmin"} />}
        {showAdminBoard && <Link to={"/admin"} />}
        {showForumBoard && <Link to={"/forums"} />}
        {showProfilBoard && <Link to={`/setting/profile`} />}
        {currentUser && (
          <div>
            <Link to={"/user"} c />
          </div>
        )}
        {currentUser ? (
          <div>
            <Link to={"/setting/profile"} />
            //logout
            <a href="/login" className="nav-link" onClick={logOut} />
          </div>
        ) : (
          <div>
            <Link to={"/login"} />
            <Link to={"/register"} />
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
