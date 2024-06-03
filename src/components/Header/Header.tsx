import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import HeaderRandom from "./HeaderRandom";

export default function Header() {
  return (
    <header>
      <Link to="/">FREEtoPLAY DB</Link>
      <div>
        <SearchBar />
        <HeaderRandom />
      </div>
    </header>
  );
}
