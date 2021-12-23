import React, { useState, useEffect } from "react";
import fibonacci from "../../mathFunction/fibonacci";
import CountDownTimer from "./CountDownTimer";
import { useAlert } from "react-alert";
import "./Alarm.scss";

// convert hour to milisecond by multipling this value
const CONVERT_HOUR_TO_MILISECOND = 60 * 60 * 1000;
const CONVERT_SECOND_TO_MILISECOND = 1000;

const Alarm = () => {
  const [durationUntilNextAlarm, setDurationUntilNextAlarm] = useState(null);
  const [timerIndex, setTimerIndex] = useState(1); // start an index of timer from 1
  const reactAlert = useAlert();
  const [currentTimer, setCurrentTimer] = useState(null);

  const alarmTimer = (duration) => {
    return new Promise((resolve) => {
      // const durationHour = duration / CONVERT_HOUR_TO_MILISECOND;
      const durationSeconds = duration / CONVERT_SECOND_TO_MILISECOND;
      // const hoursExpression = durationHour === 1 ? "hour has" : "hours have";
      const secondsExpression =
        durationSeconds === 1 ? "second has" : "seconds have";
      setTimeout(() => {
        // reactAlert.show(`${durationHour} ${hoursExpression} has passed`);
        reactAlert.show(`${durationSeconds} ${secondsExpression} passed!`);
        resolve();
      }, duration);
    });
  };

  const startAlarmTimer = async () => {
    const alarmDurationHour = fibonacci(timerIndex); // how long does it take to alert next
    const alarmDuration = alarmDurationHour * CONVERT_SECOND_TO_MILISECOND; // for testing
    // const alarmDuration = alarmDurationHour * CONVERT_HOUR_TO_MILISECOND;
    setDurationUntilNextAlarm(alarmDuration);
    await alarmTimer(alarmDuration); // wait until alert will be appeared
    setTimerIndex(timerIndex + 1); // set next timer's index
  };

  // when index of timer is changed, it sets a new timer of alarm
  useEffect(() => {
    if (Number.isInteger(timerIndex)) {
      timerIndex === 1 &&
        reactAlert.show(
          "Alarms are scheduled by a time as determined by the Fibonacci sequence"
        );
      startAlarmTimer();
    }
  }, [timerIndex]);

  // stop timer when this component is unmounted
  useEffect(() => {
    return () => {
      if (currentTimer) {
        clearInterval(currentTimer);
        setCurrentTimer(null);
      }
    };
  }, []);

  return (
    <div className="alert-wrapper">
      <div className="alert-header">Next alert will be in</div>
      <div className="alert-container">
        <CountDownTimer
          duration={durationUntilNextAlarm}
          setCurrentTimer={setCurrentTimer}
        />
      </div>
    </div>
  );
};

export default Alarm;
