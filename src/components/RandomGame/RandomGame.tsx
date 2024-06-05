import { SyntheticEvent, useContext, useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router";
import { GameContext } from "../../App";
import { Game } from "../../types/interface";
import { filterGames, getRandomGame } from "../../utils/game";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import "./RandomGame.css";

export default function RandomGame() {
  const { games, genres, platforms } = useContext(GameContext);
  const [genreInput, setGenreInput] = useState<string>("");
  const [platformInput, setPlatformInput] = useState<string>("");

  const navigate = useNavigate();

  const calculateMarqueeImages = (games: Game[]) => {
    return games.map((game) => (
      <div className="image-container marquee-image" key={game.id}>
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
      <div className="random-game-marquee-container">
        <Marquee autoFill={true} direction="left">
          {calculateMarqueeImages(games.slice(0, 10))}
        </Marquee>
        <Marquee autoFill={true} direction="right">
          {calculateMarqueeImages(games.slice(10, 20))}
        </Marquee>
      </div>
      <div className="random-game--content">
        <h1>F2P👾Database</h1>
        <p>Welcome to F2P (free-to-play) database</p>
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
      </div>
    </div>
  );
}
