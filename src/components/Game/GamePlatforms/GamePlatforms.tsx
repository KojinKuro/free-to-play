import { FaChrome, FaQuestionCircle, FaWindows } from "react-icons/fa";
import "./GamePlatforms.css";

enum Platform {
  PC = "PC (Windows)",
  BROWSER = "Web Browser",
}

export default function GamePlatforms({
  className = "",
  string,
}: {
  className?: string;
  string: string;
}) {
  const platforms = string.split(",").map((word) => word.trim());

  const platformElements = platforms.map((platform, index) => {
    switch (platform) {
      case Platform.PC:
        return <FaWindows key={index} size={20} />;
      case Platform.BROWSER:
        return <FaChrome key={index} size={20} />;
      default:
        return <FaQuestionCircle key={index} size={20} />;
    }
  });

  return <div className={className}>{platformElements}</div>;
}
