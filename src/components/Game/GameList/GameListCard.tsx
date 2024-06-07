import { Link } from "react-router-dom";
import { Game, GameFull } from "../../../types/interface";
import Badge from "../../Badge/Badge";
import GamePlatforms from "../GamePlatforms/GamePlatforms";
import "./GameListCard.css";

export default function GameListCard({
  game,
  className = "",
}: {
  game: Game | GameFull;
  className?: string;
}) {
  return (
    <div className={"game-list-card " + className}>
      <Link to={`/game/${game.id}`} className="image-container">
        <img src={game.thumbnail} alt={game.title} />
      </Link>
      <div className="game-list-info">
        <h1 className="game-list--title">{game.title}</h1>
        <div className="game-list--info-details">
          <GamePlatforms string={game.platform} />
          <Badge text={game.genre} />
        </div>
        <div>{game.short_description}</div>
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
