import { Link, Outlet } from "react-router-dom";

const Leaderboard = () => {
  return (
    <>
      <Link to="/">
        <button type="button">Go to Home</button>
      </Link>
      <h1>Thi is Leaderboard</h1>
      <Outlet />
    </>
  );
};

export default Leaderboard;
