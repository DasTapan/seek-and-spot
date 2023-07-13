import PropTypes from "prop-types";
import placeFeedback from "../helper/placeFeedback";

const Feedback = ({ pointOfClick, isActive, name, imgWidth, imgHeight }) => {
  const placement = placeFeedback(pointOfClick, imgWidth, imgHeight);

  return isActive ? (
    <span
      className="absolute z-30 rounded-lg bg-red-500 px-2 py-1 text-sm font-bold text-white shadow-lg"
      style={placement}
    >
      This is not {name}
    </span>
  ) : null;
};

Feedback.propTypes = {
  pointOfClick: PropTypes.object,
  isActive: PropTypes.bool,
  name: PropTypes.string,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
};

export default Feedback;
