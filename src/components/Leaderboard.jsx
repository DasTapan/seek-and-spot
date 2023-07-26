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
      <div className="leaderboard w-2/3 min-w-[650px] grow-[0.85] basis-[500px] rounded-lg bg-teal-900 p-3">
        <h1 className="mb-5 text-center font-lobster text-4xl tracking-widest text-yellow-300">
          Leaderboard
        </h1>
        <div className="links mb-5 flex justify-around">
          <Link
            to=""
            className="rounded-full bg-purple-500 px-3 py-1.5 text-lg font-semibold text-white hover:bg-purple-600"
          >
            PS2
          </Link>
          <Link
            to="ps3"
            className="rounded-full bg-purple-500 px-3 py-1.5 text-lg font-semibold text-white hover:bg-purple-600"
          >
            PS3
          </Link>
          <Link
            to="ps4"
            className="rounded-full bg-purple-500 px-3 py-1.5 text-lg font-semibold text-white hover:bg-purple-600"
          >
            PS4
          </Link>
          <Link
            to="n64"
            className="rounded-full bg-purple-500 px-3 py-1.5 text-lg font-semibold text-white hover:bg-purple-600"
          >
            N64
          </Link>
          <Link
            to="universe"
            className="rounded-full bg-purple-500 px-3 py-1.5 text-lg font-semibold text-white hover:bg-purple-600"
          >
            Universe
          </Link>
          <Link
            to="crossover"
            className="rounded-full bg-purple-500 px-3 py-1.5 text-lg font-semibold text-white hover:bg-purple-600"
          >
            Crossover
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Leaderboard;
