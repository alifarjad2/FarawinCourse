import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import E1 from "./E1/e1";
import E2 from "./E1/E2";
import E3 from "./E1/E3";
import D1 from "./Dooz/D1";
import Slider from "./Shop/Slider";

//theme for whole app

ReactDOM.createRoot(document.getElementById("root")).render(
  // for dev purpuse
  // just render twice
  // <React.StrictMode>
  <Slider />
  // <E3 />
  // </React.StrictMode>
);
