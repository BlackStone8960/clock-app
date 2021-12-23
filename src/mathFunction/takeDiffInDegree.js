const takeDiffInDegree = (deg1, deg2) => {
  // take difference between two degrees
  let diff = Math.abs(deg1 - deg2);

  // if difference is larger than 180°, switch it to a narrower difference
  if (diff > 180) diff = 360 - diff;
  return diff;
};

export default takeDiffInDegree;
