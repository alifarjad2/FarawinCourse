import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Api from "./Api";

//theme for whole app

ReactDOM.createRoot(document.getElementById("root")).render(
  // for dev purpuse
  // just render twice
  // <React.StrictMode>
  <Api />
  // </React.StrictMode>
);
