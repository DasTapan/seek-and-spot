import PropTypes from "prop-types";

const TargetModal = ({ position, isOpen, targets }) => {
  return (
    <>
      {isOpen ? (
        <div
          className="target-box w-44 rounded-lg border-2 border-pink-400 bg-pink-200"
          style={{
            position: "absolute",
            left: `${position.left}` + "px",
            top: `${position.top}` + "px",
          }}
        >
          <div className="target mb-1.5 flex items-center rounded-md bg-pink-300 px-1.5 py-1">
            <img
              className="mr-1.5 h-12 w-12"
              src={targets[0].iconUrl}
              alt={targets[0].id}
            />
            <span className="font-semibold text-pink-900">
              {targets[0].name}
            </span>
          </div>
          <div className="target mb-1.5 flex items-center rounded-md bg-pink-300 px-1.5 py-1">
            <img
              className="mr-1.5 h-12 w-12"
              src={targets[1].iconUrl}
              alt={targets[1].id}
            />
            <span className="font-semibold text-pink-900">
              {targets[1].name}
            </span>
          </div>
          <div className="target flex items-center rounded-md bg-pink-300 px-1.5 py-1">
            <img
              className="mr-1.5 h-12 w-12"
              src={targets[2].iconUrl}
              alt={targets[2].id}
            />
            <span className="font-semibold text-pink-900">
              {targets[2].name}
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

TargetModal.displayName = "TargetModal";

TargetModal.propTypes = {
  imageRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  position: PropTypes.object,
  isOpen: PropTypes.bool,
  targets: PropTypes.array,
};

export default TargetModal;
