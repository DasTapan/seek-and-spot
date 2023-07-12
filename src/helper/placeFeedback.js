const placeFeedback = (pointOfClick) => {
  console.log(pointOfClick);
  if (!pointOfClick) return;
  else {
    if (pointOfClick.x > 0.715) console.log("should be altered");
    else console.log("normal");
  }
};

export default placeFeedback;
