import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import "./index.css";
import { AppRouter } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);
