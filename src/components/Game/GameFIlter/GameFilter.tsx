import { ReactNode } from "react";
import "./GameFilter.css";

export default function GameFilter({ children }: { children: ReactNode }) {
  return <div className="game-filter">{children}</div>;
}
