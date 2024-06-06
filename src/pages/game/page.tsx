import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { GameContext } from "../../components/App/App";
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
      <div className="image-container game-splash">
        <img
          src={game.screenshots[1]?.image || game.thumbnail}
          alt={game.title}
        />
      </div>
      <div className="game-content-container">
        <div className="game-content">
          <h1>{game.title}</h1>
          <div className="game-info-container">
            <div style={{ whiteSpace: "pre-wrap" }}>{game.description}</div>
            <div>
              <section className="game-details">
                <table>
                  <tr>
                    <td>Genre:</td>
                    <td>{game.genre}</td>
                  </tr>
                  <tr>
                    <td>Platform:</td>
                    <td>{game.platform}</td>
                  </tr>
                  <tr>
                    <td>Publisher:</td>
                    <td>{game.publisher}</td>
                  </tr>
                  <tr>
                    <td>Developer:</td>
                    <td>{game.developer}</td>
                  </tr>
                  <tr>
                    <td>Release Date:</td>
                    <td>{game.release_date}</td>
                  </tr>
                </table>
                <Link className="game-details--button" to={game.game_url}>
                  <button>PLAY GAME</button>
                </Link>
              </section>
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
