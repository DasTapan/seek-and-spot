import { db } from "../firebase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

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
        time,
      });
    });
    console.table(scoreList);
  } catch (error) {
    console.error(error);
  }
};

export default fetchUserScore;
