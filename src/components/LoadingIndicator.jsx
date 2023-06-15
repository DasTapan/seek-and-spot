import ClipLoader from "react-spinners/ClipLoader";

const override = {
  fontWeight: "bold",
  borderWidth: "3px",
};

const LoadingIndicator = () => {
  return (
    <ClipLoader
      color="#FFFFFF"
      aria-label="Loading Spinner"
      cssOverride={override}
    />
  );
};

export default LoadingIndicator;
