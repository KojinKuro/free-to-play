import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import HeaderRandom from "./HeaderRandom";

export default function Header() {
  return (
    <header>
      <Link to="/">FREEtoPLAY DB</Link>
      <Link to="/database">Database</Link>
      <section className="header-links">
        <SearchBar />
        <HeaderRandom />
      </section>
    </header>
  );
}
