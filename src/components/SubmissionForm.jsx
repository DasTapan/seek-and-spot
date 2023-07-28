import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

const sanitizeInput = (input) => {
  const words = input.split(" ");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });

  const capitalizedStr = capitalizedWords.join(" ");
  return capitalizedStr;
};

const SubmissionForm = ({ handleSubmission, time, canvas }) => {
  const [name, setName] = useState("");
  const userId = useContext(UserContext);

  const handleChange = (e) => setName(e.target.value);
  const submitScore = async (userName) => {
    try {
      const collectionRef = collection(db, "leaderboard");
      await addDoc(collectionRef, {
        userId,
        userName,
        canvas,
        time,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // console.log("player details collected");
        const userName = name ? sanitizeInput(name) : "Anonymous Player";
        // console.log({
        //   userName,
        //   userId,
        //   time,
        // });
        await submitScore(userName);
        setName("");
        handleSubmission();
      }}
      className="flex flex-col items-center"
    >
      <div className="mb-3">
        <label
          className="mr-2 text-lg font-semibold text-white"
          htmlFor="player-name"
        >
          Your Name:
        </label>
        <input
          id="player-name"
          type="text"
          onChange={handleChange}
          name="player-name"
          value={name}
          className="mt-2 rounded-lg bg-purple-300 px-4 py-2 font-extrabold
           text-red-400 focus:border-red-400 
           focus:outline-none focus:ring"
        ></input>
      </div>
      <button
        className="rounded-lg bg-blue-500 px-6 py-2 text-lg
         text-white hover:bg-blue-700
          focus:border-yellow-400 focus:outline-none focus:ring"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

SubmissionForm.propTypes = {
  handleSubmission: PropTypes.func,
  time: PropTypes.number,
  canvas: PropTypes.string,
};

export default SubmissionForm;
