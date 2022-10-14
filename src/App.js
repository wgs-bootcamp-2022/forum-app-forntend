import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardSuperAdmin";
import BoardAdmin from "./components/BoardAdmin";
import AddForum from "./components/AddForum";
import Forum from "./components/Forum";
import ForumList from "./components/ForumList";
import Sidebar from './components/Sidebar';
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import UploadedImage from "./components/UploadProfile";
import Navbar from "./components/Navbar";
import Header from './components2/Header';

const App = () => {
 
  return (
    <div>
    <Navbar />
      <div className="container mt-3">
      {/* <BrowserRouter> */}
        <Routes>
        <Route path="/" exact element={<Home />} />
          <Route path="/forums" element={<ForumList/>} />
          <Route path="/forum/add" element={<AddForum/>} />
          {/* <Route path="/forums/:id" element={<Forum/>} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/details/:id" element={<Profile />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/upload" element={<UploadedImage />} />

        </Routes>
        {/* </BrowserRouter> */}
      </div>
      </div>


  );
};

export default App;