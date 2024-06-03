import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import DataPage from "./pages/database/page.tsx";
import ErrorPage from "./pages/error/page.tsx";
import GamePage from "./pages/game/page.tsx";
import HomePage from "./pages/home/page.tsx";
import { Game } from "./types/interface.ts";
import { getGames } from "./utils/apiCalls.ts";

export const GameContext = createContext<Game[]>([]);

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  return (
    <>
      <GameContext.Provider value={games}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/database" element={<DataPage />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </GameContext.Provider>
    </>
  );
}

export default App;
