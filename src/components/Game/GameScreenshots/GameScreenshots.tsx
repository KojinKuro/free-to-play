import Carousel from "react-multi-carousel";
import { Screenshot } from "../../../types/interface";
import "./GameScreenshots.css";

export function GameScreenshots({
  screenshots,
}: {
  screenshots: Screenshot[];
}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      responsive={responsive}
      itemClass="image-container carousel-screenshot"
    >
      {screenshots.map((screenshot) => {
        return <img key={screenshot.id} src={screenshot.image} />;
      })}
    </Carousel>
  );
}
