import { Link } from "react-router-dom";
import NavRandom from "../NavRandom";
import SearchBar from "../SearchBar/SearchBar";
import "./Nav.css";

export default function Nav() {
  return (
    <nav>
      <div className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/database">ALL GAMES</Link>
      </div>
      <section className="nav-tools">
        <SearchBar />
        <NavRandom />
      </section>
    </nav>
  );
}
