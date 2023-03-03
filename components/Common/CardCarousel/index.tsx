import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { CardCarousel as CardCarouselProps } from "@/interfaces/CardCarousel";
import { CardWithBackground } from "../CardWithBackground";
import { Button } from "@/components/Common/Button";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "@/utils/breakpoints";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import styles from "./styles.module.scss";

interface Props extends CardCarouselProps {
  wrapperClassName?: string;
  cardClassName?: string;
  slidesPerBreakpoint?: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
}

export function CardCarousel(props: Props) {
  const {
    title,
    cards,
    isBeAnAdvisorCard,
    wrapperClassName = "",
    cardClassName = "",
    slidesPerBreakpoint,
  } = props;

  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const screen = GetScreenType();

  const isNextButtonDisabled = () => {
    return screen === "desktop"
      ? currentSlide + slidesToScroll[screen] >=
          Math.floor(cards.length / slidesToScroll[screen]) - 1
      : Math.ceil(currentSlide + 1) >= cards.length;
  };

  const defaultSlidesPerBreakpointConfig = {
    desktop: 2,
    mobile: 1,
    tablet: 1.3,
  };

  const slidesToScroll = {
    desktop: 1,
    mobile: 1,
    tablet: 1,
  };

  const slidesToShow = slidesPerBreakpoint
    ? slidesPerBreakpoint
    : defaultSlidesPerBreakpointConfig;

  const settings: Settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToShow: slidesToShow["desktop"],
    slidesToScroll: slidesToScroll["desktop"],
    arrows: false,
    beforeChange: (_oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: MOBILE_BREAKPOINT,
        settings: {
          slidesToShow: slidesToShow["mobile"],
          slidesToScroll: slidesToScroll["mobile"],
        },
      },
      {
        breakpoint: TABLET_BREAKPOINT,
        settings: {
          slidesToShow: slidesToShow["tablet"],
          slidesToScroll: slidesToScroll["tablet"],
        },
      },
    ],
  };

  const goToNextSlide = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
    setCurrentSlide((currentSlide) => currentSlide + 1);
  };

  const goToPreviousSlide = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
    setCurrentSlide((currentSlide) => currentSlide - 1);
  };

  const renderCustomArrows = () => (
    <div className={styles["custom-arrows"]}>
      <button onClick={goToPreviousSlide}>
        <MdOutlineNavigateBefore />
      </button>
      <button onClick={goToNextSlide}>
        <MdOutlineNavigateNext />
      </button>
    </div>
  );

  const renderCustomArrowsAdvisorPage = () => {
    return (
      <div className={styles["custom-arrows"]}>
        <Button
          buttonType="primary"
          disabled={currentSlide === 0}
          onClick={goToPreviousSlide}
        >
          <div className={styles["button-arrow-container"]}>
            <MdOutlineNavigateBefore />
          </div>
        </Button>
        <Button
          buttonType="primary"
          disabled={isNextButtonDisabled()}
          onClick={goToNextSlide}
        >
          <div className={styles["button-arrow-container"]}>
            <MdOutlineNavigateNext />
          </div>
        </Button>
      </div>
    );
  };

  const advisorPageArrows = isBeAnAdvisorCard
    ? renderCustomArrowsAdvisorPage()
    : renderCustomArrows();

  const isArrowVisible =
    screen === "mobile" ? cards.length > 1 : cards.length > 2;

  const renderSlider = () => (
    <Slider
      className={`${styles["card-carousel__cards-slider"]} ${wrapperClassName}`}
      {...settings}
      ref={sliderRef}
    >
      {renderCards()}
    </Slider>
  );

  const renderCards = () =>
    cards.map((card) => (
      <div
        className={`${styles["card-carousel__card"]} ${cardClassName}`}
        key={card.id}
      >
        <CardWithBackground
          {...card}
          key={card.id}
          isBeAnAdvisorCard={isBeAnAdvisorCard}
        />
      </div>
    ));

  return (
    <section className={styles["card-carousel"]}>
      <strong className={styles["card-carousel__title"]}>
        {isBeAnAdvisorCard ? title.toUpperCase() : title.toUpperCase()}
      </strong>
      {renderSlider()}
      {isArrowVisible && advisorPageArrows}
    </section>
  );
}
