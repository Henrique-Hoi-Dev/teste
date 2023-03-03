import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import { TABLET_BREAKPOINT } from "@/utils/breakpoints";

interface Props {
  children: React.ReactNode;
  itemsLength: number;
  className?: string;
  customSlidesPerBreakpoint?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  orangeArrows?: boolean;
  arrowsContainerClassName?: string;
  customBreakpoint?: CustomBreakpoint;
  customPixelsBreakpoint?: Omit<CustomBreakpoint, "desktop">;
  arrowsPosition?: "top" | "bottom";
  header?: React.ReactNode;
  onSlideChange?: (index: number) => void;
}

interface CustomBreakpoint {
  desktop: number;
  tablet: number;
  mobile: number;
}

export function CardsCarousel(props: Props) {
  const {
    children,
    className,
    itemsLength,
    orangeArrows,
    arrowsContainerClassName = "",
    customPixelsBreakpoint,
    customBreakpoint,
    arrowsPosition = "bottom",
    header,
    onSlideChange,
  } = props;
  const arrowButtonStylization = orangeArrows
    ? {
        style: {
          backgroundColor: "#F58220",
          color: "white",
        },
      }
    : {};

  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultBreakpoints = {
    desktop: 2,
    tablet: 2,
    mobile: 1,
  };
  const defaultScreenBreakpoints = {
    mobile: 585,
    tablet: TABLET_BREAKPOINT,
  };

  const customScreenBreakpoints =
    customPixelsBreakpoint || defaultScreenBreakpoints;

  const screen = GetScreenType(customScreenBreakpoints);

  const handleArrowsDisplay = () => {
    if (screen === "mobile") return itemsLength > 1;

    return itemsLength > 2;
  };

  const shouldRenderArrows = handleArrowsDisplay();

  const slidesPerBreakpoint = customBreakpoint || defaultBreakpoints;

  const slidesToScrollPerBreakpoint = {
    desktop: 1,
    tablet: 1,
    mobile: 1,
  };

  const settings: Settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToShow: slidesPerBreakpoint["desktop"],
    slidesToScroll: slidesToScrollPerBreakpoint["desktop"],
    afterChange: (currentSlide) => setCurrentSlide(currentSlide),
    arrows: false,
    responsive: [
      {
        breakpoint: customScreenBreakpoints["mobile"],
        settings: {
          slidesToShow: slidesPerBreakpoint["mobile"],
          slidesToScroll: slidesPerBreakpoint["mobile"],
        },
      },
      {
        breakpoint: customScreenBreakpoints["tablet"],
        settings: {
          slidesToShow: slidesPerBreakpoint["tablet"],
          slidesToScroll: slidesToScrollPerBreakpoint["tablet"],
        },
      },
    ],
  };

  const sliderRef = useRef<Slider>(null);

  const goToNextSlide = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
    setCurrentSlide((currentSlide) => currentSlide + 1);

    onSlideChange && onSlideChange(currentSlide + 1);
  };

  const goToPreviousSlide = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
    setCurrentSlide((currentSlide) => currentSlide - 1);

    onSlideChange && onSlideChange(currentSlide - 1);
  };

  const isPreviousArrowDisabled = currentSlide === 0;
  const isNextArrowDisabled =
    currentSlide + 1 > itemsLength - slidesPerBreakpoint[screen];

  const renderCustomArrows = () => (
    <div className={`${styles["custom-arrows"]} ${arrowsContainerClassName}`}>
      <button
        {...arrowButtonStylization}
        onClick={goToPreviousSlide}
        disabled={isPreviousArrowDisabled}
      >
        <MdOutlineNavigateBefore />
      </button>
      {header ? header : ""}
      <button
        {...arrowButtonStylization}
        onClick={goToNextSlide}
        disabled={isNextArrowDisabled}
      >
        <MdOutlineNavigateNext />
      </button>
    </div>
  );

  return (
    <section className={styles["cards-carousel"]}>
      <div>
        {arrowsPosition === "top" && shouldRenderArrows && renderCustomArrows()}
      </div>
      <Slider
        className={`${styles["cards-carousel__slider"]} ${className}`}
        {...settings}
        ref={sliderRef}
      >
        {children}
      </Slider>
      {arrowsPosition === "bottom" &&
        shouldRenderArrows &&
        renderCustomArrows()}
    </section>
  );
}
