import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { GameContext } from "../../components/App/App";
import GameDisplay from "../../components/Game/GameDisplay/GameDisplay";
import GameRequirements from "../../components/Game/GameRequirements/GameRequirements";
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

  return (
    <>
      <div className="image-container game-splash">
        {game ? (
          <img
            src={game.screenshots[1]?.image || game.thumbnail}
            alt={game.title}
          />
        ) : (
          <Skeleton height={"100%"} />
        )}
      </div>
      <div className="game-content-container">
        <div className="game-content">
          <h1>{game?.title || <Skeleton width={500} />}</h1>
          <div className="game-info-container">
            <div style={{ whiteSpace: "pre-wrap" }}>
              {game?.description || <Skeleton count={10} />}
            </div>
            <div>
              <section className="game-details">
                <table>
                  <tr>
                    <td>Genre:</td>
                    <td>{game?.genre || <Skeleton width={200} />}</td>
                  </tr>
                  <tr>
                    <td>Platform:</td>
                    <td>{game?.platform || <Skeleton width={200} />}</td>
                  </tr>
                  <tr>
                    <td>Publisher:</td>
                    <td>{game?.publisher || <Skeleton width={200} />}</td>
                  </tr>
                  <tr>
                    <td>Developer:</td>
                    <td>{game?.developer || <Skeleton width={200} />}</td>
                  </tr>
                  <tr>
                    <td>Release Date:</td>
                    <td>{game?.release_date || <Skeleton width={200} />}</td>
                  </tr>
                </table>
                <Link
                  className="game-details--button"
                  to={game ? game.game_url : "/"}
                >
                  <button>PLAY GAME</button>
                </Link>
              </section>
            </div>
          </div>
          {game && (
            <>
              {game.screenshots.length > 0 && (
                <section>
                  <h3>Screenshots</h3>
                  <GameScreenshots screenshots={game.screenshots} />
                </section>
              )}
              {game.minimum_system_requirements && (
                <section>
                  <h3>Game Requirements</h3>
                  <GameRequirements game={game} />
                </section>
              )}
              {getRelevantGames(game, games).length > 0 && (
                <section>
                  <h3>Games Like {game.title}</h3>
                  <GameDisplay games={getRelevantGames(game, games)} />
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
