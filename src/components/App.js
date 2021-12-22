import React from "react";
import DegreesDisplay from "./DegreesDisplay/DegreesDisplay";
import Clock from "./Clock/Clock";
import Alarm from "./Alarm/Alarm";
import "./App.scss";

function App() {
  return (
    <div className="main-wrapper">
      <div className="main-container">
        <DegreesDisplay />
        <Clock />
        <Alarm />
      </div>
    </div>
  );
}

export default App;
