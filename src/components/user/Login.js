/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { GoogleLogin, GoogleLogout } from "react-google-login";
// import { gapi } from "gapi-script";

import { login } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  // const clientId =
  //   "555271594397-ffr5ik69p2gal86c8rutna9u89sdqovl.apps.googleusercontent.com";

  useEffect(() => {
    // const initClient = () => {
    //   gapi.client.init({
    //     clientId: clientId,
    //     scope: "",
    //   });
    // };
    // gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    setProfile(res.profileObj);
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    setProfile(null);
  };
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);

  const [message2, setMessage] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  const handleLoginGoogle = async googleData => {
    fetch("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      (response) => {
        setMessage(response.data.message2);
        setSuccessful(true);
        navigate("/login");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message2) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      } 
    )
    
    // const data = await res.json()
    // navigate("/profile");
          window.location.reload();
    // store returned user somehow
  }
  // if (isLoggedIn) {
  //   return <Navigate to="/profile" />;
  // }

  return (
    // <div className="col-md-12">
    //   <div className="card card-container">
    //     <img
    //       src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
    //       alt="profile-img"
    //       className="profile-img-card"
    //     />

    //     <Form onSubmit={handleLogin} ref={form}>
    //       <div className="form-group">
    //         <label htmlFor="username">Username</label>
    //         <Input
    //           type="text"
    //           className="form-control"
    //           name="username"
    //           value={username}
    //           onChange={onChangeUsername}
    //           validations={[required]}
    //         />
    //       </div>

    //       <div className="form-group">
    //         <label htmlFor="password">Password</label>
    //         <Input
    //           type="password"
    //           className="form-control"
    //           name="password"
    //           value={password}
    //           onChange={onChangePassword}
    //           validations={[required]}
    //         />
    //       </div>
    //       <br />
    //       <div className="form-group">
    //         <button className="btn btn-primary btn-block" disabled={loading}>
    //           {loading && (
    //             <span className="spinner-border spinner-border-sm"></span>
    //           )}
    //           <span>Login</span>
    //         </button>
    //       </div>

    //       {message && (
    //         <div className="form-group">
    //           <div className="alert alert-danger" role="alert">
    //             {message}
    //           </div>
    //         </div>
    //       )}
    //       <CheckButton style={{ display: "none" }} ref={checkBtn} />
    //     </Form>
    //   </div>
    // </div>

    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
             {/* className = " dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-700" */}
            <h2 className="mt-6 text-center text-3xl font-bold dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ">
              Sign in to your account
            </h2>
          </div>
          <Form onSubmit={handleLogin} ref={form} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  // autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ">
                  Remember me
                </label>
              </div> */}

              <div className="text-sm">
                {/* <GoogleLogin
                  clientId={clientId}
                  buttonText="Log in with Google"
                  onSuccess={handleLoginGoogle}
                  onFailure={handleLoginGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              */}
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Sign in
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
