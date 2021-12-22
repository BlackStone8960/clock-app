import React, { useEffect, useState, useReducer } from "react";
import "./CountDownTimer.scss";

const timeReducer = (state, action) => {
  switch (action.type) {
    case "SET_TIME":
      const { duration } = action;
      return {
        days: Math.floor(duration / 1000 / 60 / 60 / 24), // convert miliseconds to days
        hours: Math.floor(duration / 1000 / 60 / 60) % 24, // convert miliseconds to hours
        minutes: Math.floor(duration / 1000 / 60) % 60, // convert miliseconds to minutes
        seconds: Math.floor(duration / 1000) % 60, // convert miliseconds to seconds
      };
    case "COUNT_DOWN":
      console.log("countDown");
      const { days, hours, minutes, seconds } = state;
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        console.log("do nothing");
        return;
      } else if (hours === 0 && minutes === 0 && seconds === 0) {
        return {
          days: days - 1,
          hours: 23,
          minutes: 59,
          seconds: 59,
        };
      } else if (minutes === 0 && seconds === 0) {
        return {
          ...state,
          hours: hours - 1,
          minutes: 59,
          seconds: 59,
        };
      } else if (seconds === 0) {
        return {
          ...state,
          minutes: state.minutes - 1,
          seconds: 59,
        };
      } else {
        return {
          ...state,
          seconds: state.seconds - 1,
        };
      }
    default:
      return state;
  }
};

const CountDownTimer = ({ duration }) => {
  const [time, dispatch] = useReducer(timeReducer, null);
  const [timerMoved, setTimerMoved] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (duration) {
      dispatch({
        type: "SET_TIME",
        duration,
      });
      if (timerMoved) {
        clearInterval(timerId);
        setTimerMoved(false); // reset timer
      }
    }
  }, [duration]);

  useEffect(() => {
    if (!timerMoved && time) {
      const timer = setInterval(() => {
        dispatch({ type: "COUNT_DOWN" });
      }, 1000);
      setTimerId(timer);
      setTimerMoved(true);
    }
  }, [time]);

  return (
    <div>
      {time && (
        <span>
          {`${time.days} days ${time.hours} hours ${time.minutes} minutes ${time.seconds} seconds`}
        </span>
      )}
    </div>
  );
};

export default CountDownTimer;
