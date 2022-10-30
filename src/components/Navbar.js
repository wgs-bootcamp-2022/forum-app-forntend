/** @format */

// /** @format */

// import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../actions/auth";
// import { clearMessage } from "../actions/message";

// import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import Sidebar from "./Sidebar";
// const navigation = [
//   { name: "Dashboard", href: "#", current: true },
//   { name: "Team", href: "#", current: false },
//   { name: "Projects", href: "#", current: false },
//   { name: "Calendar", href: "#", current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// const Navbar = () => {
//   const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false);
//   const [showAdminBoard, setShowAdminBoard] = useState(false);
//   const [showUserBoard, setShowUserBoard] = useState(false);
//   const [showForumBoard, setShowForumBoard] = useState(false);

//   const { user: currentUser } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   let location = useLocation();

//   useEffect(() => {
//     if (["/login", "/register"].includes(location.pathname)) {
//       dispatch(clearMessage()); // clear message when changing location
//     }
//   }, [dispatch, location]);

//   const logOut = useCallback(() => {
//     dispatch(logout());
//   }, [dispatch]);

//   useEffect(() => {
//     if (currentUser) {
//       setShowSuperAdminBoard(currentUser.roles.includes("ROLE_SUPERADMIN"));
//       setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
//       setShowUserBoard(currentUser.roles.includes("ROLE_USER"));
//       setShowForumBoard();
//     } else {
//       setShowSuperAdminBoard(false);
//       setShowAdminBoard(false);
//       setShowUserBoard(false);
//       setShowForumBoard(false);
//     }
//   }, [currentUser]);
//   return (
//     // <nav className="navbar navbar-expand navbar-dark bg-dark" >
//     //   {/* <div className="container">

//     //   </div> */}
//     // <Link to={"/"} className="navbar-brand">
//     // Forum App
//     // </Link>

//     // <div className="navbar-nav mr-auto">
//     // <li className="nav-item">
//     //   <Link to={"/home"} className="nav-link">
//     //     Home
//     //   </Link>
//     // </li>
//     // <li className="nav-item">
//     //   <Link to={"/forums"} className="nav-link">
//     //     Forum
//     //   </Link>
//     // </li>

//     // {showSuperAdminBoard && (
//     //   <li className="nav-item">
//     //     <Link to={"/superadmin"} className="nav-link">
//     //       Super Admin Board
//     //     </Link>
//     //   </li>
//     // )}

//     // {showAdminBoard && (
//     //   <li className="nav-item">
//     //     <Link to={"/admin"} className="nav-link">
//     //       Admin Board
//     //     </Link>
//     //   </li>
//     // )}
//     // {showUserBoard && (
//     //   <li className="nav-item">
//     //     <Link to={"/user"} className="nav-link">
//     //       User Board
//     //     </Link>
//     //   </li>
//     // )}
//     //       {/* {showForumBoard && (
//     //   <li className="nav-item">
//     //     <Link to={"/forums"} className="nav-link">
//     //       Forum Board
//     //     </Link>
//     //   </li>
//     // )}
//     // {showForumBoard && (
//     //   <li className="nav-item">
//     //     <Link to={`/profile/details/${currentUser.id}`} className="nav-link">
//     //       Profil
//     //     </Link>
//     //   </li>
//     // )} */}
//     // </div>

//     // {currentUser && (

//     // <div className="navbar-nav ml-auto">
//     //   {/* <li className="nav-item">
//     //     <Link to={"/forums"} className="nav-link">
//     //       Forum
//     //     </Link>
//     //   </li> */}
//     //   <li className="nav-item">
//     //     <Link to={`/profile/details/${currentUser.id}`} className="nav-link">
//     //       Profile
//     //     </Link>
//     //   </li>
//     //   <li className="nav-item">
//     //     <a href="/login" className="nav-link" onClick={logOut}>
//     //       Log Out
//     //     </a>
//     //   </li>
//     // </div>
//     // )}
//     // {currentUser ? (
//     // <div className="navbar-nav ml-auto">
//     //   <li className="nav-item">
//     //     <Link to={"/forums"} className="nav-link">
//     //       {/* {currentUser.name} */}
//     //     </Link>
//     //   </li>
//     //   {/* <li className="nav-item">
//     //     <a href="/login" className="nav-link" onClick={logout}>
//     //       LogOut
//     //     </a>
//     //   </li> */}
//     // </div>
//     // ) :
//     // (
//     // <div className="navbar-nav ml-auto">
//     //   <li className="nav-item">
//     //     <Link to={"/login"} className="nav-link">
//     //       Login
//     //     </Link>
//     //   </li>

//     //   <li className="nav-item">
//     //     <Link to={"/register"} className="nav-link">
//     //       Sign Up
//     //     </Link>
//     //   </li>
//     // </div>
//     // )}
//     // </nav>
//     <>
//       <Disclosure as="nav" className="bg-gray-800 ">
//         {({ open }) => (
//           <>
//             <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//               <div className="relative flex h-16 items-center justify-between">
//                 <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                   {/* Mobile menu button*/}

//                   <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                     <span className="sr-only">Open main menu</span>
//                     {open ? (
//                       <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                     ) : (
//                       <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                     )}
//                   </Disclosure.Button>
//                 </div>
//                 <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                   <div className="flex flex-shrink-0 items-center">
//                     <img
//                       className="block h-8 w-auto lg:hidden"
//                       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                       alt="Your Company"
//                     />
//                     <img
//                       className="hidden h-8 w-auto lg:block"
//                       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                       alt="Your Company"
//                     />
//                   </div>
//                   <div className="hidden sm:ml-6 sm:block">
//                     <div className="flex space-x-4">
//                       <Link
//                         to={"/"}
//                         className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
//                         Dashboard
//                       </Link>
//                       <Link
//                         to={"/forums"}
//                         className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
//                         Forum
//                       </Link>

//                       {showSuperAdminBoard && (
//                         <Link
//                           to={"/superadmin"}
//                           className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
//                           Super Admin Board
//                         </Link>
//                       )}

//                       {showAdminBoard && (
//                         <div>
//                           <Link
//                             to={"/admin"}
//                             className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
//                             Admin Board
//                           </Link>
//                         </div>
//                       )}

//                       {showUserBoard && (
//                       <Link
//                         to={"/forums"}
//                         className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
//                         User Board
//                       </Link>
//                     )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                   <button
//                     type="button"
//                     className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                     <span className="sr-only">View notifications</span>
//                     <BellIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>

//                   {/* Profile dropdown */}
//                   <Menu as="div" className="relative ml-3">
//                     <div>
//                       <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                         <span className="sr-only">Open user menu</span>
//                         <img
//                           className="h-8 w-8 rounded-full"
//                           src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                           alt=""
//                         />
//                       </Menu.Button>
//                     </div>
//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-100"
//                       enterFrom="transform opacity-0 scale-95"
//                       enterTo="transform opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="transform opacity-100 scale-100"
//                       leaveTo="transform opacity-0 scale-95">
//                       <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                         <Menu.Item>
//                           {({ active }) => (
//                             <a
//                               href="#"
//                               className={classNames(
//                                 active ? "bg-gray-100" : "",
//                                 "block px-4 py-2 text-sm text-gray-700"
//                               )}>
//                               {currentUser && (
//                                 <Link
//                                   to={`/profile/details/${currentUser.id}`}
//                                   className="nav-link">
//                                   Your Profile
//                                 </Link>
//                               )}
//                             </a>
//                           )}
//                         </Menu.Item>
//                         <Menu.Item>
//                           {({ active }) => (
//                             <a
//                               href="#"
//                               className={classNames(
//                                 active ? "bg-gray-100" : "",
//                                 "block px-4 py-2 text-sm text-gray-700"
//                               )}>
//                               Settings
//                             </a>
//                           )}
//                         </Menu.Item>
//                         <Menu.Item>
//                           {({ active }) => (
//                             <a
//                               href="#"
//                               className={classNames(
//                                 active ? "bg-gray-100" : "",
//                                 "block px-4 py-2 text-sm text-gray-700"
//                               )}>
//                               {currentUser ? (
//                                 <a
//                                   href="/login"
//                                   className="nav-link"
//                                   onClick={logOut}>
//                                   Log Out
//                                 </a>
//                               ) : (
//                                 <div>
//                                   <a className="nav-item">
//                                     <Link to={"/login"} className="nav-link">
//                                       Login
//                                     </Link>
//                                   </a>

//                                   <a className="nav-item">
//                                     <Link to={"/register"} className="nav-link">
//                                       Sign Up
//                                     </Link>
//                                   </a>
//                                 </div>
//                               )}
//                             </a>
//                           )}
//                         </Menu.Item>
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>
//                 </div>
//               </div>
//             </div>

//             <Disclosure.Panel className="sm:hidden">
//               <div className="space-y-1 px-2 pt-2 pb-3">
//                 {navigation.map((item) => (
//                   <Disclosure.Button
//                     key={item.name}
//                     as="a"
//                     href={item.href}
//                     className={classNames(
//                       item.current
//                         ? "bg-gray-900 text-white"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white",
//                       "block px-3 py-2 rounded-md text-base font-medium"
//                     )}
//                     aria-current={item.current ? "page" : undefined}>
//                     {item.name}
//                   </Disclosure.Button>
//                 ))}
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>
//       <Sidebar />
//     </>
//   );
// };

// export default Navbar;

import React from "react";
import Toggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 mx-2 px-2 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex justify-between mx-auto">
        <div className="flex justify-end pr-4 pt-4">
          <span className="text-xl font-medium whitespace-nowrap dark:text-white">
            Welcome
          </span>
        </div>

        <div className="flex justify-end pr-4 pt-4">
          <Toggle />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {/* Profile dropdown */}
          <div className="flex justify-end pr-4 pt-4 ml-3">
            <div>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
