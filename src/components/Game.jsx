import { Link, useLocation, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import LoadingIndicator from "./LoadingIndicator";
import TargetModal from "./TargetModal";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

const Game = () => {
  const [targets, setTargets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalPosition, setModalPosition] = useState(null);
  const [pointOfClick, setPointOfClick] = useState(null);

  const imageRef = useRef(null);

  const location = useLocation();
  const imgUrl = location?.state?.imgUrl;
  const params = useParams();
  let artName = params?.artName;
  artName = artName.toLowerCase().replace(" ", "-");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "targets", artName);
        const docSnap = await getDoc(docRef);
        const data = { ...docSnap.data() };
        const targetsWithoutUrl = [];

        for (const key in data) {
          targetsWithoutUrl.push({
            name: data[key].name,
            id: formatName(data[key].name),
          });
        }

        const storage = getStorage();
        const listRef = ref(storage, `target-icons/${artName}`);
        const response = await listAll(listRef);
        const items = response.items;
        const fullPaths = items.map((item) => item.fullPath);

        const getUrls = async () => {
          const urls = [];

          for (const fullPath of fullPaths) {
            const regex = /^target-icons\/[a-zA-Z0-9]+\//;
            const fileName = fullPath.replace(regex, "");
            const extensionRegex = /\.[^.]+$/;
            const nameWithoutExtension = fileName.replace(extensionRegex, "");
            const url = await getDownloadURL(ref(storage, fullPath));

            urls.push({
              id: nameWithoutExtension,
              iconUrl: url,
            });
          }
          return [...urls];
        };

        const urls = await getUrls();
        const copyOfUrls = [...urls];

        const targetsWithUrl = targetsWithoutUrl.map((target) => {
          const matchingUrl = copyOfUrls.find((url) => url.id === target.id);
          return {
            ...target,
            ...matchingUrl,
          };
        });

        setTargets(targetsWithUrl);
        // setIsLoading(false);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [artName]);

  const positionTargetBox = (x, y) => {
    let clientWidth, scrollHeight;
    if (imageRef.current) {
      clientWidth = imageRef.current.clientWidth;
      scrollHeight = imageRef.current.scrollHeight;
    }

    if (clientWidth - x < 220) {
      setModalPosition({ left: `${x - 176 - 35}`, top: `${y + 30}` });
    } else if (scrollHeight - y < 220) {
      setModalPosition({
        left: `${x + 35}`,
        top: `${y - 176 - 35 + 60}`,
      });
    } else {
      setModalPosition({ left: `${x + 55}`, top: `${y + 30}` });
    }
  };

  const handleClick = (e) => {
    const { offsetX, offsetY } = {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    };
    const xDistance =
      Math.round((offsetX / imageRef.current.offsetWidth) * 1000) / 1000;
    const yDistance =
      Math.round((offsetY / imageRef.current.offsetHeight) * 1000) / 1000;

    setPointOfClick({
      x: xDistance,
      y: yDistance,
    });
    positionTargetBox(offsetX, offsetY);
    setIsModalActive(!isModalActive);
  };

  function formatName(input) {
    let output = input.toLowerCase();
    output = output.replace(" ", "-");
    return output;
  }

  return (
    <div className="game relative min-h-screen">
      <nav className="sticky top-0 flex items-center justify-between bg-[#9400D3] px-5 py-1.5 font-bold text-white">
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <div className="targets flex gap-x-12">
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div className="target flex items-center duration-200 hover:scale-150 hover:cursor-pointer hover:py-5 hover:ease-in-out">
              <span className="mr-0.5">{targets[0]?.name}</span>
              <div
                className="icon h-12 w-12 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${targets[0]?.iconUrl})` }}
              ></div>
            </div>
          )}
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div className="target flex items-center duration-200 hover:scale-150 hover:cursor-pointer hover:py-5 hover:ease-in-out">
              <span className="mr-0.5">{targets[1]?.name}</span>
              <div
                className="icon h-12 w-12 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${targets[1]?.iconUrl})` }}
              ></div>
            </div>
          )}
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div className="target flex items-center duration-200 hover:scale-150 hover:cursor-pointer hover:py-5 hover:ease-in-out">
              <span className="mr-0.5">{targets[2]?.name}</span>
              <div
                className="icon h-12 w-12 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${targets[2]?.iconUrl})` }}
              ></div>
            </div>
          )}
        </div>
        <div className="timer">Timer Here</div>
      </nav>
      <TargetModal
        modalPosition={modalPosition}
        pointOfClick={pointOfClick}
        targets={[...targets]}
        isOpen={isModalActive}
        artName={artName}
      />
      <main className="cursor-[url('/cursor-icon.png'),_crosshair] text-center">
        <img
          id="hero"
          ref={imageRef}
          src={imgUrl}
          alt={artName}
          style={{ width: "100%", height: "auto" }}
          onClick={handleClick}
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
