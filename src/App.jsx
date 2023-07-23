import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import getUserId from "./helper/getUserId";

import Home from "./components/Home";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import Canvas from "./pages/Canvas";

function App() {
  return (
    <>
      <UserContext.Provider value={getUserId()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:artName" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />}>
              <Route path="" element={<Canvas canvas="ps2" />} />
              <Route path="ps3" element={<Canvas canvas="ps3" />} />
              <Route path="ps4" element={<Canvas canvas="ps4" />} />
              <Route path="n64" element={<Canvas canvas="n64" />} />
              <Route path="universe" element={<Canvas canvas="universe" />} />
              <Route path="crossover" element={<Canvas canvas="crossover" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
