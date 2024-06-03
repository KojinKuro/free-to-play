import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GameFull } from "../../types/interface";
import { getGame } from "../../utils/apiCalls";

import "./page.css";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState<GameFull>();

  useEffect(() => {
    getGame(id).then(setGame);
  }, [id]);

  if (!game) return <div>Loading</div>;

  return (
    <>
      <div className="image-container">
        <img src={game.screenshots[0].image} alt={game.title} />
      </div>

      <div>{game.title}</div>
      <div>{game.description}</div>
    </>
  );
}
