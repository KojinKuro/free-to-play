import { SyntheticEvent, useContext, useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router";
import { GameContext } from "../../../../App";
import { Game } from "../../../../types/interface";
import { filterGames, getRandomGame } from "../../../../utils/game";
import "./RandomGame.css";

export default function RandomGame() {
  const games: Game[] = useContext(GameContext);
  const [genre, setGenre] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");

  const navigate = useNavigate();

  const calculateGameImages = (games: Game[]) => {
    return games.map((game) => (
      <div className="game-card" key={game.id}>
        <img src={game.thumbnail} alt={game.title} />
      </div>
    ));
  };

  const calculateGenres = (games: Game[]): string[] => {
    return games
      .reduce((genres, game) => {
        if (!genres.includes(game.genre)) genres.push(game.genre);
        return genres;
      }, [] as string[])
      .map((genre) => genre.trim())
      .sort((a, b) => a.localeCompare(b));
  };

  const handleButton = (e: SyntheticEvent) => {
    e.preventDefault();

    let randomGamePool = games;
    if (genre !== "" && genre !== "all")
      randomGamePool = filterGames(randomGamePool, "genre", genre);
    if (platform !== "" && platform !== "all")
      randomGamePool = filterGames(randomGamePool, "platform", platform);

    const randomGame = getRandomGame(randomGamePool);
    navigate(`/game/${randomGame.id}`);

    setPlatform("");
    setGenre("");
  };

  const genreElements = calculateGenres(games).map((genre) => (
    <option value={genre}>{genre}</option>
  ));

  return (
    <>
      <Marquee autoFill={true} direction="left">
        {calculateGameImages(games.slice(0, 5))}
      </Marquee>
      <Marquee autoFill={true} direction="right">
        {calculateGameImages(games.slice(5, 10))}
      </Marquee>
      <div>Free to play Database</div>
      <form>
        <button onClick={handleButton}>Get a random game</button>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option disabled value="">
            Genre
          </option>
          <option value="all">All</option>
          {genreElements}
        </select>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option disabled value="">
            Platform
          </option>
          <option value="all">All</option>
          <option value="pc">Windows (PC)</option>
          <option value="browser">Browser (Web)</option>
        </select>
      </form>
    </>
  );
}
