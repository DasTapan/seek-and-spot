import catalog from "../Catalog";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home min-h-screen bg-slate-200 p-2">
      <h1 className="mb-5 text-center text-5xl font-bold">Seek & Find</h1>
      <section className="flex items-start justify-between bg-purple-600">
        <button
          type="button"
          className="rounded-md bg-amber-600 px-3 py-1.5 font-bold text-white"
        >
          Leaderboard
        </button>
        <div className="catalog grid min-w-fit grid-cols-1 gap-3 bg-green-400 p-3 md:grid-cols-3">
          {catalog.map((item) => (
            <Link
              key={item.id}
              to={`/game/${item.name}`}
              state={{ imgUrl: item.imgUrl }}
            >
              <div
                className="card h-36 w-36 rounded-md bg-cover md:h-40 md:w-40 lg:h-44 lg:w-44"
                style={{ backgroundImage: `url(${item.iconUrl})` }}
              ></div>
            </Link>
          ))}
        </div>
        <div className="instruction w-72 rounded-md bg-fuchsia-400 p-2 text-center text-white">
          <h3 className="text-2xl font-bold text-black">Instructions</h3>
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
