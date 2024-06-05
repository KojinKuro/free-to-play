import { Link } from "react-router-dom";
import { Game, GameFull } from "../../../types/interface";
import "./GameListCard.css";

export default function GameListCard({ game }: { game: Game | GameFull }) {
  return (
    <div className="game-list-card">
      <div className="image-container">
        <img src={game.thumbnail} alt={game.title} />
      </div>
      <div className="game-list-info">
        <h1>{game.title}</h1>
        <div>{game.platform}</div>
        <div>{game.short_description}</div>
        <div>{game.genre}</div>
      </div>
      <div className="game-list--buttons">
        <Link to={`/game/${game.id}`}>
          <button>More details</button>
        </Link>
        <Link to={game.game_url}>
          <button>Play Game</button>
        </Link>
      </div>
    </div>
  );
}
