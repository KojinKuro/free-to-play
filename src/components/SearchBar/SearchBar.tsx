import fuzzysort from "fuzzysort";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { GameContext } from "../../App";
import "./SearchBar.css";
import { SearchResult } from "./SearchResult";

export default function SearchBar() {
  const games = useContext(GameContext);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const searchResults = fuzzysort
    .go(searchInput, games, {
      key: "title",
      limit: 5,
    })
    .map((result) => {
      const game = result.obj;

      const handleSearchClick = () => {
        navigate(`/game/${game.id}`);
        setSearchInput("");
      };

      return (
        <SearchResult onClick={handleSearchClick}>{game.title}</SearchResult>
      );
    });

  return (
    <form className="search-bar-root" autoComplete="off">
      <div className="search-bar-container">
        <div className="search-input-container">
          <label htmlFor="search-input">Search Bar</label>
          <input
            type="text"
            id="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {searchInput !== "" && (
          <div className="search-results-container">{searchResults}</div>
        )}
      </div>
      <button>Search</button>
    </form>
  );
}
