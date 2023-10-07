import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Api from "./Api";
import App from "../App";

//theme for whole app

ReactDOM.createRoot(document.getElementById("root")).render(
  // for dev purpuse
  // just render twice
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
