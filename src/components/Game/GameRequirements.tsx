import { GameFull } from "../../types/interface";

export default function GameRequirements({ game }: { game: GameFull }) {
  return (
    <div>
      <h3>Operating System</h3>
      <div>{game.minimum_system_requirements.os}</div>
      <h3>Processor</h3>
      <div>{game.minimum_system_requirements.processor}</div>
      <h3>Memory</h3>
      <div>{game.minimum_system_requirements.memory}</div>
      <h3>Graphics</h3>
      <div>{game.minimum_system_requirements.graphics}</div>
      <h3>Storage</h3>
      <div>{game.minimum_system_requirements.storage}</div>
    </div>
  );
}
