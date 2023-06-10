import { Link, useLocation, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

const Game = () => {
  const [targets, setTargets] = useState([]);
  const [iconUrls, setIconUrls] = useState([]);

  const location = useLocation();
  const imgUrl = location?.state?.imgUrl;
  const params = useParams();
  let artName = params?.artName;
  artName = artName.toLowerCase().replace(" ", "-");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "targets", artName);
        const docSnap = await getDoc(docRef);
        const data = { ...docSnap.data() };
        const names = [];
        for (const key in data) {
          names.push(data[key].name);
        }
        setTargets(names);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [artName]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const storage = getStorage();
        const listRef = ref(storage, `target-icons/${artName}`);
        const response = await listAll(listRef);
        const items = response.items;
        const fullPaths = items.map((item) => item.fullPath);
        // console.log(fullPaths);

        const getUrls = async () => {
          const urls = [];
          for (const fullPath of fullPaths) {
            const url = await getDownloadURL(ref(storage, fullPath));
            urls.push(url);
          }
          return [...urls];
        };

        const urls = await getUrls();
        console.log(urls);
        setIconUrls(urls);
      } catch (error) {
        switch (error.code) {
          case "storage/object-not-found":
            console.log("File doesn't exist");
            break;
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect the server response");
            break;
        }
      }
    };
    fetchIcons();
  }, [artName]);

  return (
    <div className="game min-h-screen">
      <nav className="flex items-center justify-between bg-teal-400 px-5 py-1.5 font-bold text-white">
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <div className="targets flex gap-x-3">
          <div className="target flex items-center">
            <span className="mr-0.5">{targets[0]}</span>
            <div
              className="icon h-12 w-12 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${iconUrls[0]})` }}
            ></div>
          </div>
          <div className="target flex items-center">
            <span className="mr-0.5">{targets[1]}</span>
            <div
              className="icon h-12 w-12 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${iconUrls[1]})` }}
            ></div>
          </div>
          <div className="target flex items-center">
            <span className="mr-0.5">{targets[2]}</span>
            <div
              className="icon h-12 w-12 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${iconUrls[2]})` }}
            ></div>
          </div>
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
