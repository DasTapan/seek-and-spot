import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Leaderboard = () => {
  useEffect(() => {
    const fetchUserScore = async () => {
      try {
        const collectionRef = collection(db, "leaderboard");
        const q = query(collectionRef, orderBy("time"));
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
    fetchUserScore();
  }, []);

  return (
    <>
      <Link to="/">
        <button type="button">Go to Home</button>
      </Link>
      <h1>Thi is Leaderboard</h1>
      <Outlet />
    </>
  );
};

export default Leaderboard;
