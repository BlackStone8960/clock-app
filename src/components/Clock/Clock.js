import React from "react";
import ClockHand from "./ClockHand";
import DigitalClock from "./DigitalClock";
import { useTimeContext } from "../../contexts/time";
import "./Clock.scss";

const Clock = () => {
  const { secondHandDegree, minuteHandDegree, hourHandDegree } =
    useTimeContext();
  return (
    <div className="clock-wrapper">
      <div className="clock-container">
        <ClockHand type="second" degree={secondHandDegree} />
        <ClockHand type="minute" degree={minuteHandDegree} />
        <ClockHand type="hour" degree={hourHandDegree} />
        <DigitalClock />
      </div>
    </div>
  );
};

export default Clock;
