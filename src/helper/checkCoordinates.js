import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

const checkCoordinates = async (picName, targetId, pointOfClick) => {
  try {
    // console.log(picName, targetId);
    const docRef = doc(db, "targets", picName);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    const data = docSnap.data();
    // console.log(data);
    let target;

    for (const key in data) {
      if (data[key].id === targetId) target = { ...data[key] };
    }
    const { xMin, xMax, yMin, yMax } = target;
    console.log({ xMin, xMax, yMin, yMax });
    console.log(pointOfClick);
    if (
      pointOfClick.x >= xMin &&
      pointOfClick.x <= xMax &&
      pointOfClick.y >= yMin &&
      pointOfClick.y <= yMax
    )
      console.log("correct target");
    else console.log("this is not the target");
  } catch (error) {
    console.error(error.message);
  }
};

export default checkCoordinates;
