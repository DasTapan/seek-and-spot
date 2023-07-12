import PropTypes from "prop-types";
import placeFeedback from "../helper/placeFeedback";

const Feedback = ({ pointOfClick, isActive, name }) => {
  const placement = placeFeedback(pointOfClick);

  return isActive ? (
    <span className="absolute z-30">This is not {name}</span>
  ) : null;
};

Feedback.propTypes = {
  pointOfClick: PropTypes.object,
  isActive: PropTypes.bool,
  name: PropTypes.string,
};

export default Feedback;
