/** @format */

// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Home from "./components/user/Home";
import Profile from "./components/user/Profile";
// import BoardUser from "./components/user/BoardUser";
import BoardAdmin from "./components/admin/BoardAdmin";
import AddForum from "./components/forum/AddForum";
import AddThread from "./components/forum/AddThread";
import Discussion from "./components/forum/Discussion";

import Forum from "./components/forum/Forum";
import ForumList from "./components/forum/ForumList";
// import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message";
// import Navbar from "./components/Navbar";
import BoardSuperAdmin from "./components/superadmin/BoardSuperAdmin";
// // import Footer from "./components/Footer";
// // import AddForum from "./components/forum/AddFoum";

// import IndexPage from "./components/IndexPage";

// const App = () => {

//   return (
//     <div>
//     <IndexPage />
//       <div className="container mt-3">
//       {/* <BrowserRouter> */}
//         <Routes>
//         <Route path="/" exact element={<Home />} />
//           <Route path="/forums" element={<ForumList />} />
//           <Route path="/forum/add" element={<AddForum />} />
//           <Route path="/forum/subforum/add" element={<AddThread />} />

//           <Route path="/forum/subforum/all/:id" element={<Forum />} />
//           <Route path="/home" element={<Home />} />
//           {/* <Route path="/user" element={<BoardUser />} /> */}
//           <Route path="/superadmin" element={<BoardSuperAdmin />} />
//           <Route path="/forum/subforum/discussion/:id" element={<Discussion />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile/details/:id" element={<Profile />} />
//           <Route path="/admin" element={<BoardAdmin />} />
//           {/* <Route path="/upload" element={<UploadedImage />} /> */}

//         </Routes>
//         {/* </BrowserRouter> */}

//       </div>
//       {/* <Footer /> */}

//       </div>

//   );
// };

// export default App;

import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
// import Profile from "./pages/Profile";
// import Login from "./components/user/Login";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/forums" element={<ForumList />} />
          <Route path="/forum/add" element={<AddForum />} />
          <Route path="/forum/subforum/add" element={<AddThread />} />

          <Route path="/forum/subforum/all/:id" element={<Forum />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/user" element={<BoardUser />} /> */}
          <Route path="/superadmin" element={<BoardSuperAdmin />} />
          <Route
            path="/forum/subforum/discussion/:id"
            element={<Discussion />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/details/:id" element={<Profile />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
