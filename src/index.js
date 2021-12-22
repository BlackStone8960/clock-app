import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import TimeProvider from "./contexts/time";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./index.scss";
import "./reset.scss";

const options = {
  position: positions.BOTTOM_LEFT,
  timeout: 0,
  offset: "10px",
  transition: transitions.FADE,
  containerStyle: {
    width: "200px",
    // opacity: "0.6",
    borderRadius: "16px",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <TimeProvider>
        <App />
      </TimeProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
