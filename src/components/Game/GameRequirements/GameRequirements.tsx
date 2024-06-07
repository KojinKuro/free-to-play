import { GameFull } from "../../../types/interface";
import "./GameRequirements.css";

export default function GameRequirements({ game }: { game: GameFull }) {
  return (
    <>
      <section className="game-requirements">
        <div className="game-req">
          <h3>Operating System</h3>
          <div>{game.minimum_system_requirements.os}</div>
        </div>
        <div className="game-req">
          <h3>Processor</h3>
          <div>{game.minimum_system_requirements.processor}</div>
        </div>
        <div className="game-req">
          <h3>Memory</h3>
          <div>{game.minimum_system_requirements.memory}</div>
        </div>
        <div className="game-req">
          <h3>Graphics</h3>
          <div>{game.minimum_system_requirements.graphics}</div>
        </div>
        <div className="game-req">
          <h3>Storage</h3>
          <div>{game.minimum_system_requirements.storage}</div>
        </div>
      </section>
    </>
  );
}
