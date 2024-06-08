import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router";
import { Game } from "../../../types/interface";
import GamePlatforms from "../GamePlatforms/GamePlatforms";
import "./GameDisplay.css";

export default function GameDisplay({ games }: { games: Game[] }) {
  const navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 650 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      responsive={responsive}
      containerClass="game-display--carousel-container"
    >
      {games.map((game) => (
        <div
          className="game-display--item"
          data-test-id="game-display-item"
          key={game.id}
          onClick={() => navigate(`/game/${game.id}`)}
        >
          <div className="image-container">
            <img src={game.thumbnail} alt={game.title} />
          </div>
          <GamePlatforms string={game.platform} />
        </div>
      ))}
    </Carousel>
  );
}
