import PropTypes from "prop-types";
import { useEffect } from "react";
import fetchUserScore from "../helper/fetchUserScore";

const Canvas = ({ canvas }) => {
  // useEffect(() => {
  //   fetchUserScore(canvas);
  // }, [canvas]);

  const displayCanvasName = (string) => {
    switch (string) {
      case "ps2":
        return "PS2";
      case "ps3":
        return "PS3";
      case "ps4":
        return "PS4";
      case "n64":
        return "N64";
      case "crossover":
        return "Crossover";
      case "universe":
        return "Universe";
    }
    throw Error("Unknown input ", string);
  };

  return (
    <div className="leaderboard">
      <h3>this is the scoreboard</h3>
    </div>
  );
};

Canvas.propTypes = {
  canvas: PropTypes.string,
};

export default Canvas;
