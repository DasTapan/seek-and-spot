import { useEffect } from "react";
import { personsRef } from "./firebase-config";
import { getDocs } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:name" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
