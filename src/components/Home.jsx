import catalog from "../Catalog";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home min-h-screen bg-gradient-to-r from-[#300063] to-[#9932CC] p-2">
      <h1 className="mx-auto mb-7 w-80 font-chokokutai text-5xl font-bold text-white">
        Seek & Find
      </h1>
      <section className="mx-auto flex items-start justify-between md:w-11/12">
        <Link to="/leaderboard">
          <button
            type="button"
            className="rounded-md bg-[#00b300] px-3 py-1.5 font-bold text-white transition delay-75 ease-in-out hover:scale-110"
          >
            Leaderboard
          </button>
        </Link>
        <div className="catalog grid min-w-fit grid-cols-1 gap-4 px-3 pb-3 pt-0 md:grid-cols-3">
          {catalog.map((item) => (
            <Link
              key={item.id}
              to={`/game/${item.name}`}
              state={{ imgUrl: item.imgUrl }}
            >
              <div className="card flex flex-col items-center transition delay-150 ease-in-out hover:scale-110">
                <div
                  className="pic mb-1.5 h-36 w-36 rounded-md bg-cover md:h-52 md:w-52 lg:h-60 lg:w-60"
                  style={{ backgroundImage: `url(${item.iconUrl})` }}
                ></div>
                <span className=" text-xl font-semibold text-white">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="instruction w-72 rounded-md bg-[#cc0066] px-8 py-3.5 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Instructions</h2>
          <ul className="list-disc">
            <li className="mb-2.5 text-left">
              <p className=" font-semibold">
                Choose one of the six available cards to start playing.
              </p>
            </li>
            <li className="mb-2.5 text-left">
              <p className=" font-semibold">
                Check the targets in the navigation bar on the game screen.
              </p>
            </li>
            <li className="mb-2.5 text-left">
              <p className=" font-semibold">
                Hover over the targets to zoom in and get a clearer view.
              </p>
            </li>
            <li className="mb-2.5 text-left">
              <p className=" font-semibold">
                Click on the screen to open a box revealing three potential
                targets.
              </p>
            </li>
            <li className="mb-2.5 text-left">
              <p className=" font-semibold">
                Select the correct character from the options provided.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
