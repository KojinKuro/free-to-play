import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import { Game } from "../../../types/interface";
import "./GameGrid.css";

export default function GameGrid({ games }: { games: Game[] }) {
  const [gamesToDisplay, setGamesToDisplay] = useState(games.slice(0, 12));
  const navigate = useNavigate();

  useEffect(() => {
    setGamesToDisplay(games.slice(0, 12));
  }, [games]);

  const getMoreGames = () => {
    setGamesToDisplay((prevGamesToDisplay) =>
      games.slice(0, prevGamesToDisplay.length + 12)
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
        <div
          className="game-grid-card"
          key={game.id}
          onClick={() => navigate(`/game/${game.id}`)}
        >
          <img src={game.thumbnail} alt={game.title} />
          <div>{game.title}</div>
        </div>
      ))}
    </InfiniteScroll>
  );
}
