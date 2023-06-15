import ClipLoader from "react-spinners/ClipLoader";

const override = {
  borderWidth: "3px",
};

const LoadingIndicator = () => {
  return (
    <ClipLoader
      color="#FFFFFF"
      aria-label="Loading Spinner"
      cssOverride={override}
      speedMultiplier={0.5}
    />
  );
};

export default LoadingIndicator;
