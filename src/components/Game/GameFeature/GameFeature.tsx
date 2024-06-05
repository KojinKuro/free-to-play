import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router";
import { Game } from "../../../types/interface";
import "./GameFeature.css";

export default function GameFeature({ games }: { games: Game[] }) {
  const navigate = useNavigate();

  const responsive = {
    general: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      containerClass="carousel-container"
      showDots={true}
      infinite={true}
      responsive={responsive}
      itemClass="game-feature--carousel-item"
    >
      {games.map((game) => (
        <div
          className="game-feature-card"
          key={game.id}
          onClick={() => navigate(`/game/${game.id}`)}
        >
          <div className="image-container">
            <img src={game.thumbnail} alt={game.title} />
          </div>
          <div className="game-feature-card--info">
            <h1 className="game-feature-title">{game.title}</h1>
            <div>{game.short_description}</div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
