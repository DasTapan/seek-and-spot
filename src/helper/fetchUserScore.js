import { db } from "../firebase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return seconds == 60
    ? minutes + 1 + " Min"
    : minutes + " Min " + (seconds < 10 ? "0" : "") + seconds + " Sec";
};

const fetchUserScore = async (canvasName) => {
  try {
    const collectionRef = collection(db, "leaderboard");
    const q = query(
      collectionRef,
      where("canvas", "==", canvasName),
      orderBy("time")
    );
    const querySnapshot = await getDocs(q);
    const scoreList = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const { userId, userName, time, canvas } = data;
      scoreList.push({
        userId,
        userName,
        canvas,
        time: millisToMinutesAndSeconds(time),
      });
    });
    // console.table(scoreList);
    return scoreList;
  } catch (error) {
    console.error(error);
  }
};

export default fetchUserScore;
