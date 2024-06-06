import { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../../components/App/App";
import GameDisplay from "../../components/Game/GameDisplay/GameDisplay";
import GameList from "../../components/Game/GameList/GameList";
import RandomGameSection from "../../components/RandomGameSection/RandomGameSection";
import { sortGamesByDate } from "../../utils/game";
import "./page.css";

export default function HomePage() {
  const { games } = useContext(GameContext);

  return (
    <>
      <RandomGameSection />
      <div className="home-content">
        <div className="home--trending">
          <h1>Trending Games</h1>
          <Link to="/database">
            <button>see more games</button>
          </Link>
        </div>
        <GameDisplay games={games.slice(0, 3)} />
        <h1>New and released</h1>
        <GameList games={sortGamesByDate(games).slice(-5).reverse()} />

        <Link to="/database" className="more-games--button">
          <button>ALL GAMES</button>
        </Link>
      </div>
    </>
  );
}
