import { ReactNode } from "react";
import "./SearchResult.css";

export function SearchResult({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <div onClick={onClick} className="search-result">
      {children}
    </div>
  );
}
