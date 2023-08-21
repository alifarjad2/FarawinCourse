import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//theme for whole app

ReactDOM.createRoot(document.getElementById("root")).render(
  // for dev purpuse
  // just render twice
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
