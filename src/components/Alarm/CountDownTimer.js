import React, { useEffect, useState, useReducer } from "react";
import "./CountDownTimer.scss";

const timeReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_TIME":
      const { duration } = action;
      return {
        days: Math.floor(duration / 1000 / 60 / 60 / 24),
        hours: Math.floor(duration / 1000 / 60 / 60) % 24,
        minutes: Math.floor(duration / 1000 / 60) % 60,
        seconds: Math.floor(duration / 1000) % 60,
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

    // case "DECREMENT_DAYS":
    //   return {
    //     days: state.days - 1,
    //     hours: 23,
    //     minutes: 59,
    //     seconds: 59,
    //   };
    // case "DECREMENT_HOURS":
    //   return {
    //     ...state,
    //     hours: state.hours - 1,
    //     minutes: 59,
    //     seconds: 59,
    //   };
    // case "DECREMENT_MINUTES":
    //   return {
    //     ...state,
    //     minutes: state.minutes - 1,
    //     seconds: 59,
    //   };
    // case "DECREMENT_SECONDS":
    //   return {
    //     ...state,
    //     seconds: state.seconds - 1,
    //   };
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
      // const timer = setInterval(() => countDown(), 1000);
      setTimerId(timer);
      setTimerMoved(true);
      // return () => clearInterval(timer);
    }
  }, [time]);

  // const countDown = () => {
  //   console.log("countDown");
  //   if (
  //     time.days === 0 &&
  //     time.hours === 0 &&
  //     time.minutes === 0 &&
  //     time.seconds === 0
  //   ) {
  //     console.log("do nothing");
  //     return;
  //   } else if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
  //     dispatch({
  //       type: "DECREMENT_DAYS",
  //     });
  //   } else if (time.minutes === 0 && time.seconds === 0) {
  //     dispatch({
  //       type: "DECREMENT_HOURS",
  //     });
  //   } else if (time.seconds === 0) {
  //     dispatch({
  //       type: "DECREMENT_MINUTES",
  //     });
  //   } else {
  //     dispatch({
  //       type: "DECREMENT_SECONDS",
  //     });
  //   }
  // };

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
