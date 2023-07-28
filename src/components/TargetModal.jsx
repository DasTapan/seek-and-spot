import PropTypes from "prop-types";
import checkCoordinates from "../helper/checkCoordinates";

const TargetModal = ({
  modalPosition,
  pointOfClick,
  isOpen,
  handleIsOpen,
  targets,
  artName,
  handleMarking,
  handleFeedback,
  handleScore,
}) => {
  const coreStyle = {
    marginBottom: "6px",
    display: "flex",
    alignItems: "center",
    borderRadius: "6px",
    paddingLeft: "6px",
    paddingRight: "6px",
    paddingTop: "4px",
    paddingBottom: "4px",
  };

  const foundStyle = {
    ...coreStyle,
    cursor: "not-allowed",
    backgroundColor: "#d1d5db",
    color: "#4b5563",
  };

  const notFoundStyle = {
    ...coreStyle,
    backgroundColor: "#f9a8d4",
    cursor: "pointer",
    color: "#831843",
  };

  if (targets.length === 0) return null;
  else {
    return (
      <>
        {isOpen ? (
          <div
            className="target-box z-50 w-44 rounded-lg border-2 border-pink-400 bg-pink-200"
            style={{
              position: "absolute",
              left: `${modalPosition.left}` + "px",
              top: `${modalPosition.top}` + "px",
            }}
          >
            {targets[0].isFound ? (
              <div className="target" style={foundStyle}>
                <img
                  className="mr-1.5 h-12 w-12"
                  src={targets[0].iconUrl}
                  alt={targets[0].id}
                />
                <span className="font-semibold">{targets[0].name}</span>
              </div>
            ) : (
              <div
                className="target"
                style={notFoundStyle}
                onClick={() => {
                  handleIsOpen(false);
                  checkCoordinates(artName, targets[0].id, pointOfClick).then(
                    ({ found }) => {
                      if (found) {
                        handleScore();
                        handleMarking(targets[0].id);
                      } else handleFeedback(targets[0].name);
                    }
                  );
                }}
              >
                <img
                  className="mr-1.5 h-12 w-12"
                  src={targets[0].iconUrl}
                  alt={targets[0].id}
                />
                <span className="font-semibold">{targets[0].name}</span>
              </div>
            )}
            {targets[1].isFound ? (
              <div className="target" style={foundStyle}>
                <img
                  className="mr-1.5 h-12 w-12"
                  src={targets[1].iconUrl}
                  alt={targets[1].id}
                />
                <span className="font-semibold">{targets[1].name}</span>
              </div>
            ) : (
              <div
                className="target"
                style={notFoundStyle}
                onClick={() => {
                  handleIsOpen(false);
                  checkCoordinates(artName, targets[1].id, pointOfClick).then(
                    ({ found }) => {
                      if (found) {
                        handleScore();
                        handleMarking(targets[1].id);
                      } else handleFeedback(targets[1].name);
                    }
                  );
                }}
              >
                <img
                  className="mr-1.5 h-12 w-12"
                  src={targets[1].iconUrl}
                  alt={targets[1].id}
                />
                <span className="font-semibold">{targets[1].name}</span>
              </div>
            )}
            {targets[2].isFound ? (
              <div className="target" style={foundStyle}>
                <img
                  className="mr-1.5 h-12 w-12"
                  src={targets[2].iconUrl}
                  alt={targets[2].id}
                />
                <span className="font-semibold">{targets[2].name}</span>
              </div>
            ) : (
              <div
                className="target"
                style={notFoundStyle}
                onClick={() => {
                  handleIsOpen(false);
                  checkCoordinates(artName, targets[2].id, pointOfClick).then(
                    ({ found }) => {
                      if (found) {
                        handleScore();
                        handleMarking(targets[2].id);
                      } else handleFeedback(targets[2].name);
                    }
                  );
                }}
              >
                <img
                  className="mr-1.5 h-12 w-12"
                  src={targets[2].iconUrl}
                  alt={targets[2].id}
                />
                <span className="font-semibold">{targets[2].name}</span>
              </div>
            )}
          </div>
        ) : null}
      </>
    );
  }
};

TargetModal.displayName = "TargetModal";

TargetModal.propTypes = {
  imageRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  modalPosition: PropTypes.object,
  isOpen: PropTypes.bool,
  handleIsOpen: PropTypes.func,
  targets: PropTypes.array,
  artName: PropTypes.string,
  pointOfClick: PropTypes.object,
  handleMarking: PropTypes.func,
  handleFeedback: PropTypes.func,
  handleScore: PropTypes.func,
};

export default TargetModal;
