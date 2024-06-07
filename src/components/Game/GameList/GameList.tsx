import { Game, GameFull } from "../../../types/interface";
import "./GameList.css";
import GameListCard from "./GameListCard";

export default function GameList({ games }: { games: Game[] | GameFull[] }) {
  return (
    <div className="game-list-container">
      {games.map((game) => (
        <GameListCard game={game} />
      ))}
    </div>
  );
}
