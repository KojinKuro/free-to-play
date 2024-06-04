import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router";
import { Game } from "../../../types/interface";

export default function GameDisplay({ games }: { games: Game[] }) {
  const navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel responsive={responsive}>
      {games.map((game) => (
        <div key={game.id} onClick={() => navigate(`/game/${game.id}`)}>
          <img src={game.thumbnail} alt={game.title} />
          <div>{game.title}</div>
        </div>
      ))}
    </Carousel>
  );
}
