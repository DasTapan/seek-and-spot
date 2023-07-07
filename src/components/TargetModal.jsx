import PropTypes from "prop-types";
import checkCoordinates from "../helper/checkCoordinates";

const TargetModal = ({
  modalPosition,
  pointOfClick,
  isOpen,
  handleIsOpen,
  targets,
  artName,
}) => {
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
          <div
            onClick={() => {
              handleIsOpen(false);
              checkCoordinates(artName, targets[0].id, pointOfClick);
            }}
            className="target mb-1.5 flex cursor-pointer items-center rounded-md bg-pink-300 px-1.5 py-1"
          >
            <img
              className="mr-1.5 h-12 w-12"
              src={targets[0].iconUrl}
              alt={targets[0].id}
            />
            <span className="font-semibold text-pink-900">
              {targets[0].name}
            </span>
          </div>
          <div
            onClick={() => {
              handleIsOpen(false);
              checkCoordinates(artName, targets[1].id, pointOfClick);
            }}
            className="target mb-1.5 flex cursor-pointer items-center rounded-md bg-pink-300 px-1.5 py-1"
          >
            <img
              className="mr-1.5 h-12 w-12"
              src={targets[1].iconUrl}
              alt={targets[1].id}
            />
            <span className="font-semibold text-pink-900">
              {targets[1].name}
            </span>
          </div>
          <div
            onClick={() => {
              handleIsOpen(false);
              checkCoordinates(artName, targets[2].id, pointOfClick);
            }}
            className="target flex cursor-pointer items-center rounded-md bg-pink-300 px-1.5 py-1"
          >
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
  modalPosition: PropTypes.object,
  isOpen: PropTypes.bool,
  handleIsOpen: PropTypes.func,
  targets: PropTypes.array,
  artName: PropTypes.string,
  pointOfClick: PropTypes.object,
};

export default TargetModal;
