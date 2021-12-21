import React, { useState, useEffect, createContext } from "react";
import Clock from "./Clock/Clock";
import "./App.scss";

function App() {
  return (
    <div className="main-wrapper">
      <div className="main-container">
        <Clock />
      </div>
    </div>
  );
}

export default App;
