import { SyntheticEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { GameContext } from "../../App";
import { getRandomGame } from "../../utils/game";
import "./HeaderRandom.css";

export default function HeaderRandom() {
  const games = useContext(GameContext);
  const navigate = useNavigate();

  const handleButton = (e: SyntheticEvent) => {
    e.preventDefault();

    const randomGame = getRandomGame(games);
    navigate(`/game/${randomGame.id}`);
  };

  return <button onClick={handleButton}>Random</button>;
}
