import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import HeaderRandom from "./HeaderRandom";

export default function Header() {
  return (
    <header>
      <section>
        <Link to="/">
          <h1>F2P👾Database</h1>
        </Link>
      </section>
      <nav>
        <Link to="/database">ALL GAMES</Link>
        <section className="header-links">
          <SearchBar />
          <HeaderRandom />
        </section>
      </nav>
    </header>
  );
}
