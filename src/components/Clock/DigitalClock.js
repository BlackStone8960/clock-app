import React from "react";
import { useTimeContext } from "../../contexts/time";
import "./DigitalClock.scss";

const DigitalClock = () => {
  const { digitalTime } = useTimeContext();
  return (
    <div className="digital-clock-wrapper">
      <span className="digital-clock">{digitalTime}</span>
    </div>
  );
};

export default DigitalClock;
