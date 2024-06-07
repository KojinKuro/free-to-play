import { useNavigate } from "react-router";
import { Game } from "../../../types/interface";
import Badge from "../../Badge/Badge";
import GamePlatforms from "../GamePlatforms/GamePlatforms";
import "./GameGridCard.css";

export default function GameGridCard({ game }: { game: Game }) {
  const navigate = useNavigate();

  return (
    <div
      className="game-grid-card hover-zoom"
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <div className="image-container">
        <img src={game.thumbnail} alt={game.title} />
      </div>
      <div className="game-grid-card--info">
        <div className="game-grid-card--info-1">
          <GamePlatforms string={game.platform} />
          <Badge text={game.genre} />
        </div>
        <div className="game-grid-card--description">
          {game.short_description}
        </div>
      </div>
    </div>
  );
}
