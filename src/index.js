/** @format */

// import React from "react";
// import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
// import "./index.css";
import './App.css';
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./components/ThemeContext";
import Background from "./components/Background";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <Background>
          <App />
        </Background>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
