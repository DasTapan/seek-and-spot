import { Link, useLocation, useParams } from "react-router-dom";

const Game = () => {
  const location = useLocation();
  const targets = location?.state?.targets;
  const imgUrl = location?.state?.imgUrl;
  const params = useParams();
  const name = params?.name;
  console.log(name);

  return (
    <div className="game min-h-screen">
      <nav className="flex justify-between bg-teal-400 px-5 py-3 font-bold text-white">
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <div className="targets">
          {targets[0]}
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {targets[1]}
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {targets[2]}
        </div>
        <div className="timer">Timer Here</div>
      </nav>
      <main className="bg-pink-600 text-center">
        <img src={imgUrl} alt={name} />
      </main>
      <footer className="flex justify-center bg-indigo-800 py-3 text-white">
        <span className="mr-3">Made by DasTapan</span>
        <span>Picture credit Artist</span>
      </footer>
    </div>
  );
};

export default Game;
