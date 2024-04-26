import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/main.css";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/user/:id" element={<Dashboard />} />
        <Route exact path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
