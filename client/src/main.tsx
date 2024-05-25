import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AppRouter from "../src/router/index";
import { store } from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

localStorage.removeItem("isLoggedIn");
localStorage.removeItem("isLoggedIn_doctor");
localStorage.removeItem("isLoggedIn_patient");
localStorage.removeItem("isLoggedIn_pathologist");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer /> 
      <AppRouter />
    </Provider>
  </React.StrictMode>,
);
