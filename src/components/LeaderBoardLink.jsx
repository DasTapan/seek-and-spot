import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const LeaderBoardLink = ({ name }) => {
  return name === "PS2" ? (
    <NavLink
      to=""
      end
      className="rounded-full bg-purple-500 px-3 py-1.5 text-lg font-semibold text-white hover:bg-purple-600"
      style={({ isActive }) =>
        isActive
          ? {
              backgroundColor: "#eab308",
              border: "2px solid #fff",
              boxShadow: "0 0 5px rgba(234,179,8,0.5)",
            }
          : {}
      }
    >
      {name}
    </NavLink>
  ) : (
    <NavLink
      to={name.toLowerCase()}
      className="rounded-full bg-purple-500 px-3 py-1.5 text-lg font-semibold text-white hover:bg-purple-600"
      style={({ isActive }) =>
        isActive
          ? {
              backgroundColor: "#eab308",
              border: "2px solid #fff",
              boxShadow: "0 0 5px rgba(234,179,8,0.5)",
            }
          : {}
      }
    >
      {name}
    </NavLink>
  );
};

LeaderBoardLink.propTypes = {
  name: PropTypes.string,
};

export default LeaderBoardLink;
