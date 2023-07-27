import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import LoadingIndicator from "./LoadingIndicator";
import TargetModal from "./TargetModal";
import Found from "./Found";
import Feedback from "./Feedback";
import Modal from "react-modal";
import SubmissionForm from "./SubmissionForm";

const SubMissionModal = Modal;

SubMissionModal.setAppElement("#root");

const submissionModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    padding: "0px",
    borderRadius: "16px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Game = () => {
  const [targets, setTargets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isFeedbackActive, setIsFeedbackActive] = useState(false);
  const [targetsFound, setTargetsFound] = useState(0);
  const [isSubmissionModalActive, setIsSubmissionModalActive] = useState(false);
  const [time, setTime] = useState(0);
  const [feedbackName, setFeedbackName] = useState("");
  const [modalPosition, setModalPosition] = useState(null);
  const [pointOfClick, setPointOfClick] = useState(null);
  const [artist, setArtist] = useState(null);

  const imageRef = useRef(null);
  const intervalRef = useRef(null);

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
        const rawInfo = { ...docSnap.data() };
        const { target1, target2, target3 } = rawInfo;
        const data = { target1, target2, target3 };
        const { artistName, artistLink } = rawInfo;
        setArtist({ artistName, artistLink });
        const targetsWithoutUrl = [];

        for (const key in data) {
          targetsWithoutUrl.push({
            name: data[key].name,
            id: formatName(data[key].name),
            isFound: false,
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

  useEffect(() => {
    if (targetsFound === 3) {
      console.log("all targets found");
      stopTimer();
      setIsSubmissionModalActive(true);
    }
  }, [targetsFound]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const startTimer = () => {
    if (intervalRef.current !== undefined) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((t) => t + 1000);
    }, 1000);
  };

  const formatTime = () => {
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

    return `${hours} : ${minutes} : ${seconds}`;
  };

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
    if (isFeedbackActive) setIsFeedbackActive(false);
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

  const markTarget = (targetId) => {
    const updatedTargets = targets.map((target) => {
      if (target.id === targetId)
        return {
          ...target,
          isFound: true,
        };
      else return target;
    });
    setTargets(updatedTargets);
  };

  const getImageDimension = () => ({
    imageWidth: imageRef.current?.clientWidth,
    imageHeight: imageRef.current?.scrollHeight,
  });

  const handleScore = () => setTargetsFound((n) => n + 1);

  const handleFeedback = (name) => {
    setFeedbackName(name);
    setIsFeedbackActive(true);
  };

  const handleSubmission = () => {
    setIsSubmissionModalActive(false);
  };

  return (
    <div className="game relative min-h-screen">
      <SubMissionModal
        isOpen={isSubmissionModalActive}
        style={submissionModalStyles}
      >
        <div className="flex flex-col items-center bg-purple-500 p-6 shadow-lg">
          <h3 className="mb-2 text-center text-2xl font-semibold text-white">
            Congratulations!! You have successfully found all targets
          </h3>
          <h4 className="mb-2 text-center text-lg font-semibold text-white">
            Please enter your name for Leaderboard
          </h4>
          <SubmissionForm
            handleSubmission={handleSubmission}
            time={time}
            canvas={artName}
          />
        </div>
      </SubMissionModal>
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#9400D3] px-5 py-1.5 font-bold text-white">
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
        <div className="timer pr-14 text-xl tracking-widest">
          {formatTime(time)}
        </div>
      </nav>
      <TargetModal
        modalPosition={modalPosition}
        pointOfClick={pointOfClick}
        targets={[...targets]}
        isOpen={isModalActive}
        handleIsOpen={setIsModalActive}
        artName={artName}
        handleMarking={markTarget}
        handleFeedback={handleFeedback}
        handleScore={handleScore}
      />
      <Feedback
        isActive={isFeedbackActive}
        pointOfClick={pointOfClick}
        name={feedbackName}
        imgWidth={imageRef.current?.offsetWidth}
        imgHeight={imageRef.current?.offsetHeight}
      />
      {targets[0]?.id ? (
        <Found
          isFound={targets[0].isFound}
          id={targets[0].id}
          picName={artName}
          getImageDimension={getImageDimension}
        />
      ) : null}
      {targets[1]?.id ? (
        <Found
          isFound={targets[1].isFound}
          id={targets[1].id}
          picName={artName}
          getImageDimension={getImageDimension}
        />
      ) : null}
      {targets[2]?.id ? (
        <Found
          isFound={targets[2].isFound}
          id={targets[2].id}
          picName={artName}
          getImageDimension={getImageDimension}
        />
      ) : null}
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
        <span>Picture credit {artist?.artistName}</span>
      </footer>
    </div>
  );
};

export default Game;
