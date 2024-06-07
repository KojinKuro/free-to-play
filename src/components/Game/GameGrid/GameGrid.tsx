import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Game } from "../../../types/interface";
import "./GameGrid.css";
import GameGridCard from "./GameGridCard";

export default function GameGrid({ games }: { games: Game[] }) {
  const [gamesToDisplay, setGamesToDisplay] = useState(games.slice(0, 24));

  useEffect(() => {
    setGamesToDisplay(games.slice(0, 12));
  }, [games]);

  const getMoreGames = () => {
    setGamesToDisplay((prevGamesToDisplay) =>
      games.slice(0, prevGamesToDisplay.length + 24)
    );
  };

  return (
    <InfiniteScroll
      dataLength={gamesToDisplay.length}
      next={getMoreGames}
      hasMore={gamesToDisplay.length < games.length}
      loader={<h4>Loading ...</h4>}
      className="game-grid"
    >
      {gamesToDisplay.map((game) => (
        <GameGridCard key={game.id} game={game} />
      ))}
    </InfiniteScroll>
  );
}
