import catalog from "../Catalog";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home min-h-screen bg-gradient-to-r from-[#300063] to-[#9932CC] p-2">
      <h1 className="mx-auto mb-7 w-80 font-chokokutai text-5xl font-bold text-white">
        Seek & Find
      </h1>
      <section className="mx-auto flex items-start justify-between md:w-5/6">
        <button
          type="button"
          className="rounded-md bg-[#00b300] px-3 py-1.5 font-bold text-white"
        >
          Leaderboard
        </button>
        <div className="catalog grid min-w-fit grid-cols-1 gap-3 px-3 pb-3 pt-0 md:grid-cols-3">
          {catalog.map((item) => (
            <Link
              key={item.id}
              to={`/game/${item.name}`}
              state={{ imgUrl: item.imgUrl }}
            >
              <div
                className="card h-36 w-36 rounded-md bg-cover md:h-48 md:w-48 lg:h-56 lg:w-56"
                style={{ backgroundImage: `url(${item.iconUrl})` }}
              ></div>
            </Link>
          ))}
        </div>
        <div className="instruction w-72 rounded-md bg-[#cc0066] p-2 text-center text-white">
          <h2 className="text-3xl font-bold text-white">Instructions</h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          quis cum possimus magnam ex minus non error dolor quibusdam cupiditate
          quod commodi provident sunt obcaecati animi, voluptates officia
          aliquid est.
        </div>
      </section>
    </main>
  );
};

export default Home;
