import { useEffect } from "react";
import { personsRef } from "./firebase-config";
import { getDocs } from "firebase/firestore";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
