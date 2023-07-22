import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import getUserId from "./helper/getUserId";

import Home from "./components/Home";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <>
      <UserContext.Provider value={getUserId()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:artName" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />}>
              <Route path="ps2" />
              <Route path="ps3" />
              <Route path="ps4" />
              <Route path="n64" />
              <Route path="universe" />
              <Route path="crossover" />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
