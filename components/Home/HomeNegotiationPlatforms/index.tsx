import { Button } from "@/components/Common/Button";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { NegotiationPlatforms } from "@/endpoints/fetchHomeData";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Slider, { Settings } from "react-slick";
import styles from "./styles.module.scss";
import { ChevronLeft } from "@/icons/ChevronLeft";
import { ChevronRight } from "@/icons/ChevronRight";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "@/utils/breakpoints";

interface HomeNegotiationPlatformsProps {
  negotiationPlatforms: NegotiationPlatforms;
}

export function HomeNegotiationPlatforms({
  negotiationPlatforms,
}: HomeNegotiationPlatformsProps) {
  const ref = useRef<Slider>(null);
  const REFRESH_SLIDER_INTERVAL = 5;
  const numberOfPlatforms = negotiationPlatforms?.images?.data?.length;

  const [currentSlide, setCurrentSlide] = useState(0);

  const [timeLeft, setTimeLeft] = useState(REFRESH_SLIDER_INTERVAL);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      setTimeLeft(REFRESH_SLIDER_INTERVAL);
    }

    const intervalId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const customScreenBreakpoints = {
    mobile: MOBILE_BREAKPOINT,
    tablet: 1220,
  };

  const screen = GetScreenType(customScreenBreakpoints);

  const slidesToShow = useMemo(
    () => ({
      mobile: 1,
      tablet: 2,
      desktop: 3,
    }),
    []
  );

  const slidesToScroll = useMemo(
    () => ({
      mobile: 1,
      tablet: 1,
      desktop: 2,
    }),
    []
  );

  const getCurrentSlide = () => {
    return currentSlide === 0 ? currentSlide : currentSlide - 1;
  };

  const customPaging = (index: number) => (
    <div
      className={`
    ${styles["carousel-dot"]}
    ${getCurrentSlide() === index && styles["carousel-dot__active"]}
  `}
    />
  );

  const settings: Settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: slidesToScroll[screen],
    slidesToShow: slidesToShow[screen],
    afterChange: (currentSlide) => setCurrentSlide(currentSlide),
    dots: true,
    customPaging,
    responsive: [
      {
        breakpoint: customScreenBreakpoints["tablet"],
        settings: {
          slidesToScroll: slidesToScroll["tablet"],
          slidesToShow: slidesToShow["tablet"],
          customPaging: () => <></>,
        },
      },
      {
        breakpoint: customScreenBreakpoints["mobile"],
        settings: {
          slidesToScroll: slidesToScroll["mobile"],
          slidesToShow: slidesToShow["mobile"],
          customPaging: () => <></>,
        },
      },
    ],
  };

  const handleNext = useCallback(() => {
    currentSlide + slidesToScroll[screen] < numberOfPlatforms - 1;
    if (currentSlide + slidesToScroll[screen] < numberOfPlatforms - 1) {
      ref?.current?.slickNext();
    } else {
      ref?.current?.slickGoTo(0);
      setCurrentSlide((_oldState) => 0);
    }
  }, [currentSlide, numberOfPlatforms, screen, slidesToScroll]);

  function handlePrevious() {
    ref?.current?.slickPrev();
  }

  function chevronWrapper(chevronIcon: JSX.Element) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {chevronIcon}
      </div>
    );
  }

  return (
    <section
      id="home-negotiation-platforms"
      aria-labelledby="home-negotiation-platforms"
      className={styles["home-negotiation-platforms"]}
    >
      <h2 id="home-negotiation-platforms">{negotiationPlatforms?.title}</h2>

      <div className={styles["row"]}>
        {screen === "desktop" && (
          <Button
            buttonType="primary"
            onClick={handlePrevious}
            disabledPartner={currentSlide === 0}
          >
            {chevronWrapper(<ChevronLeft />)}
          </Button>
        )}
        <ul>
          <Slider {...settings} ref={ref}>
            {negotiationPlatforms?.images?.data?.map((image) => (
              <li key={image.id}>
                <StrapiImage src={image.attributes.url} />
              </li>
            ))}
          </Slider>

          {screen !== "desktop" && (
            <footer>
              <Button
                buttonType="primary"
                onClick={handlePrevious}
                disabledPartner={getCurrentSlide() === 0}
              >
                {chevronWrapper(<ChevronLeft />)}
              </Button>
              <Button
                buttonType="primary"
                onClick={handleNext}
                disabledPartner={
                  currentSlide + slidesToScroll[screen] >= numberOfPlatforms - 1
                }
              >
                {chevronWrapper(<ChevronRight />)}
              </Button>
            </footer>
          )}
        </ul>

        {screen === "desktop" && (
          <Button
            buttonType="primary"
            onClick={handleNext}
            disabledPartner={
              currentSlide + slidesToScroll[screen] >= numberOfPlatforms - 1
            }
          >
            {chevronWrapper(<ChevronRight />)}
          </Button>
        )}
      </div>
    </section>
  );
}
