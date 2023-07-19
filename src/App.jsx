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
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
