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
  const [countDownDuration, setCountDownDuration] = useState(null);

  const alarmTimer = (duration) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("alert!");
        // alerting process
        resolve();
      }, duration);
    });
  };

  const startAlarmTimer = async () => {
    try {
      console.log("startAlarmTimer");
      const alarmDurationHour = fibonacci(timerIndex); // how long does it take to alert next
      console.log(alarmDurationHour);
      const alarmDuration = alarmDurationHour * CONVERT_SECOND_TO_MILISECOND; // for testing
      // const alarmDuration = alarmDurationHour * CONVERT_HOUR_TO_MILISECOND;
      setDurationUntilNextAlarm(alarmDuration);
      await alarmTimer(alarmDuration);
      setTimerIndex(timerIndex + 1);
    } catch (err) {
      console.error(`Something went wrong when setting alarm: ${err}`);
    }
  };

  useEffect(() => {
    if (Number.isInteger(timerIndex)) {
      startAlarmTimer();
    }
  }, [timerIndex]);

  // useEffect(() => {
  //   if (Number.isInteger(durationUntilNextAlarm)) {
  //     const seconds = Math.floor(durationUntilNextAlarm / 1000) % 60;
  //     const minutes = Math.floor(durationUntilNextAlarm / 1000 / 60) % 60;
  //     const hours = Math.floor(durationUntilNextAlarm / 1000 / 60 / 60) % 24;
  //     const days = Math.floor(durationUntilNextAlarm / 1000 / 60 / 60 / 24);
  //     setCountDownDuration({ seconds, minutes, hours, days });
  //   }
  // }, [durationUntilNextAlarm]);

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
