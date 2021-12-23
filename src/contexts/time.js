import React, { createContext, useContext, useState, useEffect } from "react";
import moment from "moment";

// create context to manage the time
const TimeContext = createContext();

// an interval to update current time using moment.js
const TIMER_UPDATE_INTERVAL = 1000;

const TimeProvider = ({ children }) => {
  const [secondHandDegree, setSecondHandDegree] = useState(null);
  const [minuteHandDegree, setMinuteHandDegree] = useState(null);
  const [hourHandDegree, setHourHandDegree] = useState(null);
  const [digitalTime, setDigitalTime] = useState(null);

  const updateAnalogClock = (moment) => {
    // find degrees of each hand from 12 o'clock.
    // you can get a degree of second hand by multiplying current seconds by 6
    const second = moment.seconds() * 6;

    // to find a degree of minute hand, you have to add how much second hand ticks
    const minute = moment.minutes() * 6 + second / 60;

    // find a degree of hour hand in the same way
    const hour = ((moment.hours() % 12) / 12) * 360 + minute / 12;
    setSecondHandDegree(second);
    setMinuteHandDegree(minute);
    setHourHandDegree(hour);
  };

  const updateDigitalClock = (moment) => {
    // format current time like "9:09:09 AM"
    const formattedTime = moment.format("h:mm:ss A");
    setDigitalTime(formattedTime);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const momentObj = moment(); // create moment object
      updateAnalogClock(momentObj); // update analog clock with created moment object
      updateDigitalClock(momentObj); // update digital clock
    }, TIMER_UPDATE_INTERVAL);

    return () => clearInterval(timer); // when unmounting, clear timer to get current time
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
