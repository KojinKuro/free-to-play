import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import DataPage from "../../pages/database/page.tsx";
import ErrorPage from "../../pages/error/page.tsx";
import GamePage from "../../pages/game/page.tsx";
import HomePage from "../../pages/home/page.tsx";
import { Game } from "../../types/interface.ts";
import { getGames } from "../../utils/apiCalls.ts";
import { calculateCategory } from "../../utils/game.ts";
import Footer from "../Footer/Footer.tsx";
import Header from "../Header/Header.tsx";
import Nav from "../Nav/Nav.tsx";
import ScrollToTop from "../ScrollToTop.ts";
import "./App.css";

export const GameContext = createContext<{
  games: Game[];
  genres: string[];
  platforms: string[];
}>({ games: [], genres: [], platforms: [] });

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);

  useEffect(() => {
    getGames().then((data): void => {
      setGames(data);
      setGenres(calculateCategory("genre", data));
      setPlatforms(calculateCategory("platform", data));
    });
  }, []);

  return (
    <>
      <GameContext.Provider value={{ games, genres, platforms }}>
        <Header />
        <Nav />
        <main>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/database" element={<DataPage />} />
              <Route path="/game/:id" element={<GamePage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </GameContext.Provider>
    </>
  );
}

export default App;
