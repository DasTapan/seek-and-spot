import { Link, useLocation, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const Game = () => {
  const [targets, setTargets] = useState([]);

  const location = useLocation();
  const imgUrl = location?.state?.imgUrl;
  const params = useParams();
  let artName = params?.artName;
  artName = artName.toLowerCase().replace(" ", "-");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "targets", artName);
      const docSnap = await getDoc(docRef);
      const data = { ...docSnap.data() };
      const names = [];
      for (const key in data) {
        names.push(data[key].name);
      }
      setTargets(names);
    };
    fetchData();
    console.log("effect ran");
  }, [artName]);

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
        <img
          src={imgUrl}
          alt={artName}
          style={{ width: "100%", height: "auto" }}
        />
      </main>
      <footer className="flex justify-center bg-indigo-800 py-3 text-white">
        <span className="mr-3">Made by DasTapan</span>
        <span>Picture credit Artist</span>
      </footer>
    </div>
  );
};

export default Game;
