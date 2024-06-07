import { useContext, useState } from "react";
import { GameContext } from "../../components/App/App";
import { CategorySelect } from "../../components/CategorySelect/CategorySelect";
import GameFeature from "../../components/Game/GameFeature/GameFeature";
import GameFilter from "../../components/Game/GameFilter/GameFilter";
import GameGrid from "../../components/Game/GameGrid/GameGrid";
import {
  filterGames,
  sortGamesByAlphabetic,
  sortGamesByDate,
} from "../../utils/game";

enum SortBy {
  TRENDING = "trending",
  ALPHABETIC = "alphabetic",
  ALPHABETIC_REVERSE = "alphabetic_reverse",
  OLDEST = "release",
  NEWEST = "release_reverse",
}

export default function DataPage() {
  const { games, genres, platforms } = useContext(GameContext);
  const [genreInput, setGenreInput] = useState("");
  const [platformInput, setPlatformInput] = useState("");
  const [sortInput, setSortInput] = useState<SortBy>(SortBy.TRENDING);

  let gamesToDisplay = games;
  if (genreInput !== "" && genreInput !== "All")
    gamesToDisplay = filterGames(gamesToDisplay, "genre", genreInput);
  if (platformInput !== "" && platformInput !== "All")
    gamesToDisplay = filterGames(gamesToDisplay, "platform", platformInput);

  switch (sortInput) {
    case SortBy.TRENDING:
      // we get the list sorted by trending by default so we do nothing
      gamesToDisplay = gamesToDisplay;
      break;
    case SortBy.ALPHABETIC:
      gamesToDisplay = sortGamesByAlphabetic(gamesToDisplay);
      break;
    case SortBy.ALPHABETIC_REVERSE:
      gamesToDisplay = sortGamesByAlphabetic(gamesToDisplay).reverse();
      break;
    case SortBy.OLDEST:
      gamesToDisplay = sortGamesByDate(gamesToDisplay);
      break;
    case SortBy.NEWEST:
      gamesToDisplay = sortGamesByDate(gamesToDisplay).reverse();
      break;
  }

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
        <select onChange={(e) => setSortInput(e.target.value as SortBy)}>
          <option value={SortBy.TRENDING}>Trending</option>
          <option value={SortBy.ALPHABETIC}>{"A -> Z"}</option>
          <option value={SortBy.ALPHABETIC_REVERSE}>{"Z -> A"}</option>
          <option value={SortBy.NEWEST}>Newest</option>
          <option value={SortBy.OLDEST}>Oldest</option>
        </select>
      </GameFilter>
      <GameGrid games={gamesToDisplay} />
    </div>
  );
}
