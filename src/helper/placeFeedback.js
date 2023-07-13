const placeFeedback = (pointOfClick, imgWidth, imgHeight) => {
  // console.log({ pointOfClick, imgWidth, imgHeight });
  if (!pointOfClick) return;
  else {
    if (pointOfClick.x > 0.715) {
      console.log("should be altered");
      let left = imgWidth * pointOfClick.x - 160;
      let top = imgHeight * pointOfClick.y + 40;
      left = `${Math.round(left * 1000) / 1000}` + "px";
      top = `${Math.round(top * 1000) / 1000}` + "px";
      return { left, top };
    } else {
      console.log("normal");
      let left = imgWidth * pointOfClick.x + 55;
      let top = imgHeight * pointOfClick.y + 50;
      left = `${Math.round(left * 1000) / 1000}` + "px";
      top = `${Math.round(top * 1000) / 1000}` + "px";
      console.log({ left, top });
      return { left, top };
    }
  }
};

export default placeFeedback;
