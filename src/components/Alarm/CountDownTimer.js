import React, { useEffect, useState, useReducer, useRef } from "react";
import LoadingAnimation from "../LoadingAnimation";
import "./CountDownTimer.scss";

const timeReducer = (state, action) => {
  switch (action.type) {
    // set timer by the duration passed from action
    case "SET_TIME":
      const { duration } = action;
      return {
        days: Math.floor(duration / 1000 / 60 / 60 / 24), // convert miliseconds to days
        hours: Math.floor(duration / 1000 / 60 / 60) % 24, // convert miliseconds to hours
        minutes: Math.floor(duration / 1000 / 60) % 60, // convert miliseconds to minutes
        seconds: Math.floor(duration / 1000) % 60, // convert miliseconds to seconds
      };
    // start count down
    case "COUNT_DOWN":
      const { days, hours, minutes, seconds } = state;
      // if all counts are 0, return state as it is
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        return state;
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

const CountDownTimer = ({ duration, setCurrentTimer }) => {
  const [time, dispatch] = useReducer(timeReducer, null);
  const [timerMoved, setTimerMoved] = useState(false);
  const timerRef = useRef(null); // ref of an ID of alert timer

  useEffect(() => {
    if (duration && duration.length !== 0) {
      // stop a timer if it is moving
      if (timerMoved) {
        clearInterval(timerRef.current);
        setTimerMoved(false); // reset timer
      }
      // set timer by the duration passed from parent component
      dispatch({
        type: "SET_TIME",
        duration: duration[0],
      });
    }
  }, [duration]);

  useEffect(() => {
    if (!timerMoved && time) {
      timerRef.current = setInterval(() => {
        dispatch({ type: "COUNT_DOWN" });
      }, 1000);
      setCurrentTimer(timerRef.current);
      setTimerMoved(true);
    }
  }, [time]);

  return (
    <>
      {time ? (
        <div className="count-number-wrapper">
          <span className="count-number-container">
            <b className="count-number">{time.days}</b>
            {time.days !== 1 ? "days" : "day"}
          </span>
          <span className="count-number-container">
            <b className="count-number">{time.hours}</b>
            {time.hours !== 1 ? "hours" : "hour"}
          </span>
          <span className="count-number-container">
            <b className="count-number">{time.minutes}</b>
            {time.minutes !== 1 ? "minutes" : "minute"}
          </span>
          <span className="count-number-container">
            <b className="count-number">{time.seconds}</b>
            {time.seconds !== 1 ? "seconds" : "second"}
          </span>
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};

export default CountDownTimer;
