import PropTypes from "prop-types";
import { useState } from "react";

const SubmissionForm = ({ handleSubmission }) => {
  const [name, setName] = useState("");

  const handleChange = (e) => setName(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("player name collected");
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
};

export default SubmissionForm;
