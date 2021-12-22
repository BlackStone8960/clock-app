import React, { useState, useEffect } from "react";
import fibonacci from "../../mathFunction/fibonacci";
import CountDownTimer from "./CountDownTimer";
import { useAlert } from "react-alert";
import { useTimeContext } from "../../contexts/time";
import "./Alarm.scss";

// convert hour to milisecond by multipling this value
const CONVERT_HOUR_TO_MILISECOND = 60 * 60 * 1000;
const CONVERT_SECOND_TO_MILISECOND = 1000;

const Alarm = () => {
  const { timerRef } = useTimeContext();
  const [durationUntilNextAlarm, setDurationUntilNextAlarm] = useState(null);
  const [timerIndex, setTimerIndex] = useState(1); // start an index of timer from 1
  const alert = useAlert();

  const alarmTimer = (duration) => {
    return new Promise((resolve) => {
      // const durationHour = duration / CONVERT_HOUR_TO_MILISECOND;
      const durationSeconds = duration / CONVERT_SECOND_TO_MILISECOND;
      // const hoursExpression = durationHour === 1 ? "hour" : "hours"
      const secondsExpression = durationSeconds === 1 ? "second" : "seconds";
      setTimeout(() => {
        // alert.show(`${durationHour} ${hoursExpression} has passed`);
        alert.show(`${durationSeconds} ${secondsExpression} has passed!`);
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
        alert.show(
          "Alarms are scheduled by a time as determined by the Fibonacci sequence"
        );
      startAlarmTimer();
    }
  }, [timerIndex]);

  useEffect(() => {
    // stop timer when this component is unmounted
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  return (
    <div className="alert-wrapper">
      <div className="alert-header">Next alert will be in</div>
      <div className="alert-container">
        <CountDownTimer duration={durationUntilNextAlarm} />
      </div>
    </div>
  );
};

export default Alarm;
