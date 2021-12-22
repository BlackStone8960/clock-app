import React from "react";
import LoadingGif from "../images/loading.gif";
import "./LoadingAnimation.scss";

const LoadingAnimation = () => {
  return (
    <div className="gif-wrapper">
      <img src={LoadingGif} id="loading-gif" />
    </div>
  );
};

export default LoadingAnimation;
