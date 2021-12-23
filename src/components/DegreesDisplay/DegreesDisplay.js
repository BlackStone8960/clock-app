import React, { useState, useEffect } from "react";
import { useTimeContext } from "../../contexts/time";
import takeDiffInDegree from "../../mathFunction/takeDiffInDegree";
import "./DegreesDisplay.scss";

const DegreesDisplay = () => {
  const [degrees, setDegrees] = useState(0);
  const { minuteHandDegree, hourHandDegree } = useTimeContext();

  useEffect(() => {
    if (minuteHandDegree && hourHandDegree) {
      // take difference between two degrees
      const degreesBetweenTwoHands = takeDiffInDegree(
        minuteHandDegree,
        hourHandDegree
      );
      setDegrees(degreesBetweenTwoHands);
    }
  }, [minuteHandDegree, hourHandDegree]);
  return (
    <div className="degrees-wrapper">
      <div>Degrees between minute hand and hour hand</div>
      <div className="degrees-container">
        <span className="degrees">{`${degrees}°`}</span>
      </div>
    </div>
  );
};

export default DegreesDisplay;
