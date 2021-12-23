import React from "react";
import DegreesDisplay from "./DegreesDisplay/DegreesDisplay";
import Clock from "./Clock/Clock";
import Alarm from "./Alarm/Alarm";
import LoadingAnimation from "./LoadingAnimation";
import { useTimeContext } from "../contexts/time";
import "./App.scss";

function App() {
  const { secondHandDegree, minuteHandDegree, hourHandDegree } =
    useTimeContext();

  return (
    <div className="main-wrapper">
      <div className="main-container">
        {(secondHandDegree || secondHandDegree === 0) &&
        (minuteHandDegree || secondHandDegree === 0) &&
        (hourHandDegree || secondHandDegree === 0) ? (
          <>
            <DegreesDisplay />
            <Clock />
          </>
        ) : (
          <LoadingAnimation />
        )}
        <Alarm />
      </div>
    </div>
  );
}

export default App;
