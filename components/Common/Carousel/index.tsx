import styles from "./styles.module.scss";
import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import {
  CarouselItem,
  CarouselItemProps,
} from "@/components/Common/Carousel/CarouselItem";

interface CarouselProps {
  heading: string;
  items: CarouselItemProps[];
  isFounderPage?: boolean;
  className?: string;
  classNameContent?: string;
}

export function Carousel({
  heading,
  items,
  isFounderPage,
  className,
  classNameContent,
}: CarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: undefined,
    nextArrow: undefined,
    dots: true,
    dotsClass: `slick-dots slick-thumb ${
      isFounderPage ? styles["carousel-dots__founder-page-container"] : ``
    }`,
    customPaging: (index: number) => (
      <div
        className={`
        ${styles["carousel-dot"]}
        ${activeSlide === index && styles["carousel-dot__active"]}
      }
    `}
      >
        <span>{index + 1}</span>
      </div>
    ),
    afterChange: (currentSlide: number) => setActiveSlide(currentSlide),
  };

  return (
    <section
      aria-labelledby="carousel-heading"
      className={styles["carousel-container"]}
    >
      <h3 id="carousel-heading">{heading}</h3>
      <ul>
        <Slider {...settings}>
          {items?.map((item) => (
            <CarouselItem
              key={item.title}
              {...item}
              className={className}
              classNameContent={classNameContent}
            />
          ))}
        </Slider>
      </ul>
    </section>
  );
}
