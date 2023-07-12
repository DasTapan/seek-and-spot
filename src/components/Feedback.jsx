import PropTypes from "prop-types";
import placeFeedback from "../helper/placeFeedback";

const Feedback = ({ pointOfClick, isActive, name, imgWidth, imgHeight }) => {
  const placement = placeFeedback(pointOfClick, imgWidth, imgHeight);

  return isActive ? (
    <span
      className="absolute z-30 font-semibold text-red-700"
      style={placement}
    >
      This is not target
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
