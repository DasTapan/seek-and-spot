import { Link, Outlet } from "react-router-dom";

const Leaderboard = () => {
  return (
    <div className="wrapper flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FF00FF] to-[#FFFF00] pt-7">
      <Link to="/" className="mb-5">
        <button
          type="button"
          className="transform rounded-full bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:scale-110"
        >
          Home
        </button>
      </Link>
      <div className="leaderboard w-2/3 min-w-[650px] grow-[0.85] basis-[500px] rounded-lg bg-teal-900">
        <Outlet />
      </div>
    </div>
  );
};

export default Leaderboard;
