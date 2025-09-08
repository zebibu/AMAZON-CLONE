import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css";

function carousel() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={true}
      >
        {img.map((imageItemLink, index) => (
          <img key={index} src={imageItemLink} alt={`Slide ${index}`} />
        ))}
      </Carousel>
    </div>
  );
}

export default carousel;
