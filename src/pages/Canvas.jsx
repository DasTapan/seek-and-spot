import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import fetchUserScore from "../helper/fetchUserScore";
import { v4 as uuidv4 } from "uuid";

const Canvas = ({ canvas }) => {
  const [scoreCard, setScoreCard] = useState(null);

  useEffect(() => {
    const getScores = async () => {
      const scoreCard = await fetchUserScore(canvas);
      // console.log(scoreCard);
      setScoreCard(scoreCard);
    };
    getScores();
  }, [canvas]);

  return scoreCard ? (
    <div className="canvas-outlet font-specialelite tracking-wide">
      {scoreCard.map((score) => (
        <div
          key={uuidv4()}
          className="player mb-3.5 flex items-center justify-between rounded-xl bg-gray-100 px-4 py-2 shadow-md"
        >
          <span className="text-xl font-bold text-gray-900">
            {scoreCard.indexOf(score) + 1}
          </span>
          <span className="text-lg font-semibold text-gray-700">
            {score.userName}
          </span>
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm text-white">
            {score.time}
          </span>
        </div>
      ))}
    </div>
  ) : (
    <i>
      <h3 className="text-center text-3xl font-bold text-white">loading...</h3>
    </i>
  );
};

Canvas.propTypes = {
  canvas: PropTypes.string,
};

export default Canvas;
