import React, { useRef, useState } from "react";
import { Button } from "@/components/Common/Button";
import { Link } from "@/components/Common/Link";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { Advantage } from "@/endpoints/fetchHomeData";
import { ChevronLeft } from "@/icons/ChevronLeft";
import { ChevronRight } from "@/icons/ChevronRight";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import Slider from "react-slick";
import styles from "./styles.module.scss";
import { BsChevronRight } from "react-icons/bs";

interface HomeAdvantagesProps {
  title: string;
  advantages: Advantage[];
}

export function HomeAdvantages({ title, advantages }: HomeAdvantagesProps) {
  const ref = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const customScreenBreakpoints = {
    tablet: 920,
    mobile: 600
  };
  const screen = GetScreenType(customScreenBreakpoints);

  const slidesToShow = {
    desktop: 3,
    tablet: 2,
    mobile: 1
  };

  const advantagesCarouselSettings = {
    infinite: false,
    speed: 300,
    slidesToShow: slidesToShow["desktop"],
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: customScreenBreakpoints["tablet"],
        settings: {
          slidesToShow: slidesToShow["tablet"]
        }
      },
      {
        breakpoint: customScreenBreakpoints["mobile"],
        settings: {
          slidesToShow: slidesToShow["mobile"]
        }
      }
    ]
  };

  function handleNext() {
    ref?.current?.slickNext();
    setCurrentSlide((oldState) => oldState + 1);
  }

  function handlePrevious() {
    ref?.current?.slickPrev();
    setCurrentSlide((oldState) => oldState - 1);
  }

  const renderCardsList = () =>
    advantages.map((advantage) => (
      <li key={advantage.title}>
        <div className={styles["image-wrapper"]}>
          <StrapiImage
            src={advantage?.image?.data?.attributes.url}
            alt={advantage.title}
            loading="lazy"
          />
        </div>
        <span>
          <h3>{advantage?.title}</h3>
          <p>{advantage?.description}</p>
          <div>
            <Link
              href={advantage?.link?.Url}
              className={styles["home-advantages__know-more-container"]}
            >
              {advantage?.link?.Label}
              <BsChevronRight />
            </Link>
          </div>
        </span>
      </li>
    ));

  return (
    <section
      id="home-advantages"
      aria-labelledby="home-advantages"
      className={styles["home-advantages"]}
    >
      <h2 id="home-advantages" className={styles["home-advantages__title"]}>
        {title}
      </h2>
      <ul>
        <Slider ref={ref} {...advantagesCarouselSettings}>
          {renderCardsList()}
        </Slider>
        <footer>
          <Button
            buttonType="primary"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
          >
            <ChevronLeft />
          </Button>
          <Button
            buttonType="primary"
            onClick={handleNext}
            disabled={
              currentSlide + 1 > advantages.length - slidesToShow[screen]
            }
          >
            <ChevronRight />
          </Button>
        </footer>
      </ul>
    </section>
  );
}
