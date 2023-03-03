import { useState } from "react";
import Slider from "react-slick";
import styles from "./styles.module.scss";

interface CarouselProps {
  heading: string;
  children: React.ReactNode;
  leftAlignedDots?: boolean;
}

export function GenericCarousel({
  heading,
  children,
  leftAlignedDots
}: CarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    fade: true,
    speed: 500,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: undefined,
    nextArrow: undefined,
    dotsClass: `slick-dots slick-thumb ${
      leftAlignedDots ? styles["carousel-dots__left-aligned-container"] : ``
    }`,
    customPaging: (index: number) => (
      <div
        className={`
      ${styles["carousel-dot"]}
      ${activeSlide === index && styles["carousel-dot__active"]}
    `}
      >
        <span>{index + 1}</span>
      </div>
    ),
    afterChange: (currentSlide: number) => setActiveSlide(currentSlide)
  };

  return (
    <section
      aria-labelledby="carousel-heading"
      className={styles["carousel-container"]}
    >
      <h3 id="carousel-heading">{heading}</h3>
      <ul>
        <Slider {...settings}>{children}</Slider>
      </ul>
    </section>
  );
}
