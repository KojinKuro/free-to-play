import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import HeaderRandom from "./HeaderRandom";

export default function Header() {
  return (
    <header>
      <div>FREEtoPLAY DB</div>
      <div>
        <SearchBar />
        <HeaderRandom />
      </div>
    </header>
  );
}
