import { Link } from "react-router-dom";
import ps2Icon from "/pics/ps2-icon.jpeg";
import ps2 from "/pics/ps2.jpeg";
import crossover from "/pics/crossover.jpg";
import crumblingCreek from "/pics/crumbling-creek.png";
import ps3Icon from "/pics/ps3-icon.jpeg";
import ps3 from "/pics/ps3.jpeg";
import ps4Icon from "/pics/ps4-icon.jpeg";
import ps4 from "/pics/ps4-icon.jpeg";
import snes from "/pics/snes.jpeg";

const Home = () => {
  const catalog = [
    { id: 1, name: "PS2", iconUrl: ps2Icon, imgUrl: ps2 },
    {
      id: 2,
      name: "Crossover",
      iconUrl: crossover,
      imgUrl: crossover,
    },
    {
      id: 3,
      name: "Crumbling Creek",
      iconUrl: crumblingCreek,
      imgUrl: crumblingCreek,
    },
    {
      id: 4,
      name: "PS3",
      iconUrl: ps3Icon,
      imgUrl: ps3,
    },
    { id: 5, name: "PS4", iconUrl: ps4Icon, imgUrl: ps4 },
    { id: 6, name: "SNES", iconUrl: snes, imgUrl: snes },
  ];

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
            <Link key={item.id}>
              <div
                className="card h-36 w-36 rounded-md bg-cover md:h-40 md:w-40 lg:h-44 lg:w-44"
                style={{ backgroundImage: `url(${item.iconUrl})` }}
              ></div>
            </Link>
          ))}
        </div>
        {/* <div className="catalog grid min-w-fit grid-cols-1 gap-3 bg-green-400 p-3 md:grid-cols-3">
          <Link
            to="/game/ps2"
            state={{ id: 1, targets: ["Tommy Vercelli", "Crash", "Spyro"] }}
          >
            <div className="card h-36 w-36 bg-red-700 text-center font-bold text-white md:h-40 md:w-40 lg:h-44 lg:w-44">
              PS2
            </div>
          </Link>
          <Link
            to="/game/xbox"
            state={{
              id: 2,
              targets: ["Master Chief", "Marcus Fenix", "Bill Gates"],
            }}
          >
            <div className="card h-36 w-36 bg-red-700 text-center font-bold text-white md:h-40 md:w-40 lg:h-44 lg:w-44">
              Xbox
            </div>
          </Link>
          <Link
            to="/game/ps4"
            state={{
              id: 3,
              targets: ["Arthur Morgan", "Nathan Drake", "Sekiro"],
            }}
          >
            <div className="card h-36 w-36 bg-red-700 text-center font-bold text-white md:h-40 md:w-40 lg:h-44 lg:w-44">
              PS4
            </div>
          </Link>
          <Link
            to="/game/n64"
            state={{ id: 4, targets: ["Marion", "Luigi", "Mario"] }}
          >
            <div className="card h-36 w-36 bg-red-700 text-center font-bold text-white md:h-40 md:w-40 lg:h-44 lg:w-44">
              N64
            </div>
          </Link>
          <Link
            to="/game/ps3"
            state={{ id: 5, targets: ["Kratos", "Van Sulivan", "Snake"] }}
          >
            <div className="card h-36 w-36 bg-red-700 text-center font-bold text-white md:h-40 md:w-40 lg:h-44 lg:w-44">
              PS3
            </div>
          </Link>
          <Link
            to="/game/dream-cast"
            state={{ id: 6, targets: ["Kazama", "Sub-Zero", "Sonic"] }}
          >
            <div className="card h-36 w-36 bg-red-700 text-center font-bold text-white md:h-40 md:w-40 lg:h-44 lg:w-44">
              Dreamcast
            </div>
          </Link>
        </div> */}
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
