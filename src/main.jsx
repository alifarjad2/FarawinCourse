import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // for dev purpuse
  // just render twice
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
