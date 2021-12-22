import React, { createContext, useContext, useState, useEffect } from "react";
import moment from "moment";

const TimeContext = createContext();
const TIMER_UPDATE_INTERVAL = 1000;

const TimeProvider = ({ children }) => {
  const [secondHandDegree, setSecondHandDegree] = useState(0);
  const [minuteHandDegree, setMinuteHandDegree] = useState(0);
  const [hourHandDegree, setHourHandDegree] = useState(0);
  const [digitalTime, setDigitalTime] = useState("");

  const updateAnalogClock = (moment) => {
    const second = moment.seconds() * 6;
    const minute = moment.minutes() * 6 + second / 60;
    const hour = ((moment.hours() % 12) / 12) * 360 + minute / 12;

    setSecondHandDegree(second);
    setMinuteHandDegree(minute);
    setHourHandDegree(hour);
  };

  const updateDigitalClock = (moment) => {
    const formattedTime = moment.format("h:mm:ss a");
    setDigitalTime(formattedTime);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const momentObj = moment(); // create moment object
      updateAnalogClock(momentObj);
      updateDigitalClock(momentObj);
    }, TIMER_UPDATE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimeContext.Provider
      value={{
        secondHandDegree,
        minuteHandDegree,
        hourHandDegree,
        digitalTime,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};
const useTimeContext = () => useContext(TimeContext);

export { TimeProvider as default, useTimeContext };
