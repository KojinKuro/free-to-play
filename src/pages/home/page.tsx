import { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../../App";
import GameDisplay from "../../components/Game/GameDisplay/GameDisplay";
import GameList from "../../components/Game/GameList/GameList";
import { sortGamesByDate } from "../../utils/game";
import RandomGame from "./components/RandomGame/RandomGame";

export default function HomePage() {
  const { games } = useContext(GameContext);

  return (
    <>
      <RandomGame />
      <h1>Trending Games</h1>
      <GameDisplay games={games.slice(0, 3)} />
      <h1>New and released</h1>
      <GameList games={sortGamesByDate(games).slice(-5).reverse()} />
      <Link to="/database">
        <button>ALL GAMES</button>
      </Link>
    </>
  );
}
