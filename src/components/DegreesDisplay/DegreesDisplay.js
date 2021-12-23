import React, { useState, useEffect } from "react";
import { useTimeContext } from "../../contexts/time";
import "./DegreesDisplay.scss";

const DegreesDisplay = () => {
  const [degrees, setDegrees] = useState(0);
  const { minuteHandDegree, hourHandDegree } = useTimeContext();

  useEffect(() => {
    if (minuteHandDegree && hourHandDegree) {
      const degreesBetweenTwoHands =
        Math.abs(hourHandDegree - minuteHandDegree) % 180;
      setDegrees(degreesBetweenTwoHands);
    }
  }, [minuteHandDegree, hourHandDegree]);
  return (
    <div className="degrees-wrapper">
      <div>Degrees between the minute hand and hour hand</div>
      <div className="degrees-container">
        <span className="degrees">{`${degrees}°`}</span>
      </div>
    </div>
  );
};

export default DegreesDisplay;
