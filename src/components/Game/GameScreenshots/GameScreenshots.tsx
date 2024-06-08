import Carousel from "react-multi-carousel";
import { Screenshot } from "../../../types/interface";
import "./GameScreenshots.css";

export function GameScreenshots({
  screenshots,
}: {
  screenshots: Screenshot[];
}) {
  const responsive = {
    general: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      itemClass="image-container"
    >
      {screenshots.map((screenshot) => {
        return (
          <img
            key={screenshot.id}
            src={screenshot.image}
            data-test-id="game-screenshot"
          />
        );
      })}
    </Carousel>
  );
}
