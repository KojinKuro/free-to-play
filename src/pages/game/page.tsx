import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { GameContext } from "../../App";
import GameDisplay from "../../components/Game/GameDisplay/GameDisplay";
import GameRequirements from "../../components/Game/GameRequirements";
import { GameScreenshots } from "../../components/Game/GameScreenshots/GameScreenshots";
import { GameFull } from "../../types/interface";
import { getGame } from "../../utils/apiCalls";
import { getRelevantGames } from "../../utils/game";
import "./page.css";

export default function GamePage() {
  const { games } = useContext(GameContext);
  const { id } = useParams();
  const [game, setGame] = useState<GameFull>();

  useEffect(() => {
    getGame(id).then(setGame);
  }, [id]);

  if (!game) return <div>Loading</div>;

  return (
    <>
      <div
        className="image-container"
        style={{ width: "100%", height: "600px" }}
      >
        <img
          src={game.screenshots[0]?.image || game.thumbnail}
          alt={game.title}
        />
      </div>
      <div className="game-content-container">
        <div className="game-content">
          <div>
            <h1>{game.title}</h1>
            <Link to={game.game_url}>
              <button>PLAY GAME</button>
            </Link>
          </div>
          <div className="game-info-container">
            <div>{game.description}</div>
            <div>
              <div>Genre: {game.genre}</div>
              <div>Platform: {game.platform}</div>
              <div>Publisher: {game.publisher}</div>
              <div>Developer: {game.developer}</div>
              <div>Release Date: {game.release_date}</div>
            </div>
          </div>
          {game.screenshots.length > 0 && (
            <GameScreenshots screenshots={game.screenshots} />
          )}
          {game.minimum_system_requirements && <GameRequirements game={game} />}
          <h1>Games Like {game.title}</h1>
          <GameDisplay games={getRelevantGames(game, games)} />
        </div>
      </div>
    </>
  );
}
