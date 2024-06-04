import { SyntheticEvent, useContext, useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router";
import { GameContext } from "../../../../App";
import { CategorySelect } from "../../../../components/CategorySelect/CategorySelect";
import { Game } from "../../../../types/interface";
import { filterGames, getRandomGame } from "../../../../utils/game";
import "./RandomGame.css";

export default function RandomGame() {
  const { games, genres, platforms } = useContext(GameContext);
  const [genreInput, setGenreInput] = useState<string>("");
  const [platformInput, setPlatformInput] = useState<string>("");

  const navigate = useNavigate();

  const calculateGameImages = (games: Game[]) => {
    return games.map((game) => (
      <div className="game-card" key={game.id}>
        <img src={game.thumbnail} alt={game.title} />
      </div>
    ));
  };

  const handleButton = (e: SyntheticEvent) => {
    e.preventDefault();

    let randomGamePool = games;
    if (genreInput !== "" && genreInput !== "All")
      randomGamePool = filterGames(randomGamePool, "genre", genreInput);
    if (platformInput !== "" && platformInput !== "All")
      randomGamePool = filterGames(randomGamePool, "platform", platformInput);

    const randomGame = getRandomGame(randomGamePool);
    navigate(`/game/${randomGame.id}`);

    setPlatformInput("");
    setGenreInput("");
  };

  return (
    <div className="random-game-container">
      <Marquee autoFill={true} direction="left">
        {calculateGameImages(games.slice(0, 5))}
      </Marquee>
      <h1>Free to play Database</h1>
      <form className="random-game-form">
        <button onClick={handleButton}>Get a random game</button>
        <div>
          <CategorySelect
            category="Genre"
            categoryData={genres}
            categoryInput={genreInput}
            setCategoryInput={setGenreInput}
          />
          <CategorySelect
            category="Platform"
            categoryData={platforms}
            categoryInput={platformInput}
            setCategoryInput={setPlatformInput}
          />
        </div>
      </form>
      <Marquee autoFill={true} direction="right">
        {calculateGameImages(games.slice(5, 10))}
      </Marquee>
    </div>
  );
}
