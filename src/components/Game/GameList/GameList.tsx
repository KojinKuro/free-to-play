import { useNavigate } from "react-router";
import { Game, GameFull } from "../../../types/interface";
import "./GameList.css";

export default function GameList({ games }: { games: Game[] | GameFull[] }) {
  const navigate = useNavigate();

  return (
    <div className="game-list-container">
      <div className="game-list">
        {games.map((game) => (
          <div
            className="game-list-card"
            key={game.id}
            onClick={() => navigate(`/game/${game.id}`)}
          >
            <div className="image-container">
              <img src={game.thumbnail} alt={game.title} />
            </div>
            <div className="game-list-info">
              <h1>{game.title}</h1>
              <div>{game.genre}</div>
              <div>Price: Free</div>
              <div>{game.short_description}</div>
              <div>{game.platform}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
