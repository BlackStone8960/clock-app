/*
    param {Number} num: the index in the Fibonacci sequence
    return the number whose index in the Fibonacci sequence is num 
   */
const fibonacci = (num) => {
  // check if num is positive integer
  if (Number.isInteger(num) && num >= 0) {
    // the first and second number of Fibonacci sequence are 1
    let lowestNum = 1; // set first number as 1
    let middleNum = 1; // set second number as 1
    let highestNum; // the sum of lowestNum and middleNum

    // if num is larger than 3, iterate and find the value of the number whose index in the Fibonacci sequence is num
    for (let i = 3; i <= num; i++) {
      highestNum = lowestNum + middleNum; // add lowestNum and middleNum and set it to highestNum
      lowestNum = middleNum; // increment index of lowestNum
      middleNum = highestNum; // increment index of middleNum
    }
    // if num is 0 or 1, it returns 1. if num is larger than 3, it returns the sum of lowestNum and middleNum
    return middleNum;
  } else {
    console.error("Input positive integer into the fibonacci function");
  }
};

export default fibonacci;
