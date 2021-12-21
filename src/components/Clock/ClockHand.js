import React from "react";
import "./ClockHand.scss";

const ClockHand = ({ degree, type }) => {
  const styles = {
    transform: `rotate(${degree}deg)`,
  };
  return type === "second" ? (
    <div style={styles} className="clock_hand-wrapper" id="second_hand">
      <div></div>
    </div>
  ) : type === "minute" ? (
    <div style={styles} className="clock_hand-wrapper" id="minute_hand">
      <div></div>
    </div>
  ) : type === "hour" ? (
    <div style={styles} className="clock_hand-wrapper" id="hour_hand">
      <div></div>
    </div>
  ) : (
    <></>
  );
};

export default ClockHand;
