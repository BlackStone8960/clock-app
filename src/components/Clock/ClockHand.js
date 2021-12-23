import React from "react";
import "./ClockHand.scss";

const ClockHand = ({ degree, type }) => {
  const styles = {
    transform: `rotate(${degree}deg)`,
  };
  return type === "second" ? (
    <div style={styles} className="clock-hand-wrapper" id="second-hand">
      <div className="clock-hand"></div>
    </div>
  ) : type === "minute" ? (
    <div style={styles} className="clock-hand-wrapper" id="minute-hand">
      <div className="clock-hand"></div>
    </div>
  ) : type === "hour" ? (
    <div style={styles} className="clock-hand-wrapper" id="hour-hand">
      <div className="clock-hand"></div>
    </div>
  ) : (
    <></>
  );
};

export default ClockHand;
