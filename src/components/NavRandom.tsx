import { SyntheticEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { getRandomGame } from "../utils/game";
import { GameContext } from "./App/App";

export default function NavRandom() {
  const { games } = useContext(GameContext);
  const navigate = useNavigate();

  const handleButton = (e: SyntheticEvent) => {
    e.preventDefault();

    const randomGame = getRandomGame(games);
    navigate(`/game/${randomGame.id}`);
  };

  return (
    <button onClick={handleButton} data-test-id="nav-random-button">
      Random
    </button>
  );
}
