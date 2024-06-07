import { GameFull } from "../../../types/interface";
import "./GameRequirements.css";

export default function GameRequirements({ game }: { game: GameFull }) {
  return (
    <>
      <section className="game-requirements">
        <div className="game-req">
          <h4>Operating System</h4>
          <div>{game.minimum_system_requirements.os}</div>
        </div>
        <div className="game-req">
          <h4>Processor</h4>
          <div>{game.minimum_system_requirements.processor}</div>
        </div>
        <div className="game-req">
          <h4>Memory</h4>
          <div>{game.minimum_system_requirements.memory}</div>
        </div>
        <div className="game-req">
          <h4>Graphics</h4>
          <div>{game.minimum_system_requirements.graphics}</div>
        </div>
        <div className="game-req">
          <h4>Storage</h4>
          <div>{game.minimum_system_requirements.storage}</div>
        </div>
      </section>
    </>
  );
}
