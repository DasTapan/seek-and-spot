import PropTypes from "prop-types";
import checkCoordinates from "../helper/checkCoordinates";
import { useEffect, useState } from "react";

const Found = ({ id, picName, isFound, getImageDimension }) => {
  const [markingStyle, setMarkingStyle] = useState({ left: "0px", top: "0px" });

  useEffect(() => {
    checkCoordinates(picName, id, { x: 0, y: 0 })
      .then(({ targetDimension }) => {
        const { imageWidth, imageHeight } = getImageDimension();
        const { xMin, xMax, yMin, yMax } = targetDimension;
        const xMid = (xMin + xMax) / 2;
        const yMid = (yMin + yMax) / 2;
        const updatedPosition = {
          left: `${Math.floor((imageWidth * xMid - 40) * 1000) / 1000}` + "px",
          top: `${Math.floor((imageHeight * yMid + 20) * 1000) / 1000}` + "px",
        };
        setMarkingStyle(updatedPosition);
      })
      .catch((error) => console.error(error));
  }, [id, picName, getImageDimension]);

  return isFound ? (
    <img
      src="/found7.png"
      alt="found"
      className="absolute"
      style={markingStyle}
    />
  ) : null;
};

Found.propTypes = {
  id: PropTypes.string,
  picName: PropTypes.string,
  getImageDimension: PropTypes.func,
  isFound: PropTypes.bool,
};

export default Found;
