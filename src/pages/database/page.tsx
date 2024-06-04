import { useContext, useState } from "react";
import { GameContext } from "../../App";
import { CategorySelect } from "../../components/CategorySelect/CategorySelect";
import GameFilter from "../../components/Game/GameFIlter/GameFilter";
import GameFeature from "../../components/Game/GameFeature/GameFeature";
import GameGrid from "../../components/Game/GameGrid/GameGrid";
import { filterGames } from "../../utils/game";

export default function DataPage() {
  const { games, genres, platforms } = useContext(GameContext);
  const [genreInput, setGenreInput] = useState("");
  const [platformInput, setPlatformInput] = useState("");

  let gamesToDisplay = games;
  if (genreInput !== "" && genreInput !== "All")
    gamesToDisplay = filterGames(gamesToDisplay, "genre", genreInput);
  if (platformInput !== "" && platformInput !== "All")
    gamesToDisplay = filterGames(gamesToDisplay, "platform", platformInput);

  return (
    <div>
      <GameFeature games={games.slice(0, 5)} />
      <GameFilter>
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
      </GameFilter>
      <GameGrid games={gamesToDisplay} />
    </div>
  );
}
