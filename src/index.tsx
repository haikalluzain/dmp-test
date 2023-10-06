import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Boostrap Libs
import "bootstrap/dist/js/bootstrap.bundle.min";

//SBAdmin2 Style
import "./styles/scss/sb-admin-2.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
