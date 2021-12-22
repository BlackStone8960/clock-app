import React, { useState, useEffect } from "react";
import fibonacci from "../../mathFunction/fibonacci";
import CountDownTimer from "./CountDownTimer";
import "./Alert.scss";

// convert hour to milisecond by multipling this value
const CONVERT_HOUR_TO_MILISECOND = 60 * 60 * 1000;
const CONVERT_SECOND_TO_MILISECOND = 1000;

const Alarm = () => {
  const [durationUntilNextAlarm, setDurationUntilNextAlarm] = useState(null);
  const [timerIndex, setTimerIndex] = useState(1);

  const alarmTimer = (duration) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(`${duration / CONVERT_SECOND_TO_MILISECOND} seconds passed!`);
        // alert(`${duration / CONVERT_HOUR_TO_MILISECOND} hours passed!`);
        resolve();
      }, duration);
    });
  };

  const startAlarmTimer = async () => {
    // console.log("startAlarmTimer");
    const alarmDurationHour = fibonacci(timerIndex); // how long does it take to alert next
    console.log(alarmDurationHour);
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
        alert(
          "Alarms are scheduled by a time as determined by the Fibonacci sequence"
        );
      startAlarmTimer();
    }
  }, [timerIndex]);

  return (
    <div className="alert-wrapper">
      <div>Next alert will be in</div>
      <div className="alert-container">
        <CountDownTimer duration={durationUntilNextAlarm} />
      </div>
    </div>
  );
};

export default Alarm;
