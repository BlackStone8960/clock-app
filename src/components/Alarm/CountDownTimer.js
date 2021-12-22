import React, { useEffect, useState, useReducer, useRef } from "react";
import { useTimeContext } from "../../contexts/time";
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
  const { timerRef } = useTimeContext();
  const [time, dispatch] = useReducer(timeReducer, null);
  const [timerMoved, setTimerMoved] = useState(false);

  useEffect(() => {
    if (duration) {
      dispatch({
        type: "SET_TIME",
        duration,
      });
      if (timerMoved) {
        clearInterval(timerRef.current);
        setTimerMoved(false); // reset timer
      }
    }
  }, [duration]);

  useEffect(() => {
    if (!timerMoved && time) {
      timerRef.current = setInterval(() => {
        dispatch({ type: "COUNT_DOWN" });
      }, 1000);
      setTimerMoved(true);
    }
  }, [time]);

  return (
    <div>
      {time && (
        <>
          <span className="count-number-wrapper">
            <b className="count-number">{time.days}</b>days
          </span>
          <span className="count-number-wrapper">
            <b className="count-number">{time.hours}</b>hours
          </span>
          <span className="count-number-wrapper">
            <b className="count-number">{time.minutes}</b>minutes
          </span>
          <span className="count-number-wrapper">
            <b className="count-number">{time.seconds}</b>seconds
          </span>
        </>
      )}
    </div>
  );
};

export default CountDownTimer;
