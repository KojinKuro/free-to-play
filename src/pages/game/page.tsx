import { useContext, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
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
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    getGame(id).then(setGame).catch(showBoundary);
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
                <div className="game-detail--section">
                  <div>Genre:</div>
                  <div>{game?.genre || <Skeleton width={200} />}</div>
                </div>
                <div className="game-detail--section">
                  <div>Platform:</div>
                  <div>{game?.platform || <Skeleton width={200} />}</div>
                </div>
                <div className="game-detail--section">
                  <div>Publisher:</div>
                  <div>{game?.publisher || <Skeleton width={200} />}</div>
                </div>
                <div className="game-detail--section">
                  <div>Developer:</div>
                  <div>{game?.developer || <Skeleton width={200} />}</div>
                </div>
                <div className="game-detail--section">
                  <div>Release Date:</div>
                  <div>{game?.release_date || <Skeleton width={200} />}</div>
                </div>
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
