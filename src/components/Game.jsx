import { Link, useLocation, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const Game = () => {
  const [targets, setTargets] = useState([]);

  const location = useLocation();
  const imgUrl = location?.state?.imgUrl;
  const params = useParams();
  let art = params?.art;
  art = art.toLowerCase().replace(" ", "-");

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "items", art);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const { target1, target2, target3 } = { ...data };
        setTargets([target1.name, target2.name, target3.name]);
        console.log("use effect ran");
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [art]);

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
