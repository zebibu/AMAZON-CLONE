import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css";

function CarouselComponent() {
  return (
    <div className="banner-with-categories">
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img
              key={imageItemLink}
              src={imageItemLink}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
