import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import ScrollContainer from "react-indiana-drag-scroll";
import { Video, VideosCategory } from "@/interfaces/VideoCarousel";
import { Button } from "@/components/Common/Button";
import { ChevronLeft } from "@/icons/ChevronLeft";
import { ChevronRight } from "@/icons/ChevronRight";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { Modal } from "@/components/Common/Modal";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { isMobile } from "@/utils/hooks/isMobile";

const settings: Settings = {
  dots: false,
  speed: 500,
  infinite: false,
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1
      }
    }
  ]
};

export function VideosCarousel(props: VideosCategory) {
  const { title, description, videos } = props;
  const videosToShow = 2;
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const sliderRef = useRef<Slider>(null);

  const openVideo = (video: Video) => {
    setIsVideoOpen(true);
    setCurrentVideo(video);
  };

  const closeVideo = () => {
    setCurrentVideo(null);
    setIsVideoOpen(false);
  };

  function handleNext() {
    sliderRef?.current?.slickNext();
    setCurrentSlide((oldState) => oldState + 1);
  }

  function handlePrevious() {
    sliderRef?.current?.slickPrev();
    setCurrentSlide((oldState) => oldState - 1);
  }

  const renderCustomArrows = () => (
    <footer>
      <Button
        buttonType="primary"
        onClick={handlePrevious}
        disabled={currentSlide === 0}
      >
        <div>
          <ChevronLeft />
        </div>
      </Button>
      <Button
        buttonType="primary"
        onClick={handleNext}
        disabled={currentSlide >= videosToShow}
      >
        <div>
          <ChevronRight />
        </div>
      </Button>
    </footer>
  );

  const mobile = isMobile();

  const isArrowVisible = mobile ? false : videos.length > 2;

  const renderSlider = () =>
    mobile ? (
      <ScrollContainer className={styles["video-carousel__videos-slider"]}>
        {renderVideos()}
      </ScrollContainer>
    ) : (
      <Slider
        className={styles["video-carousel__videos-slider"]}
        {...settings}
        ref={sliderRef}
      >
        {renderVideos()}
      </Slider>
    );

  const renderVideos = () =>
    videos.map((video) => (
      <div className={styles["video-carousel__video"]} key={video.id}>
        <StrapiImage
          src={video.thumbnail.data.attributes.url}
          onClick={() => openVideo(video)}
        />
      </div>
    ));

  return (
    <section className={`container ${styles["video-carousel"]}`}>
      <strong className={styles["video-carousel__title"]}>{title}</strong>
      <span className={styles["video-carousel__description"]}>
        {description}
      </span>
      {renderSlider()}
      {isArrowVisible && renderCustomArrows()}
      <Modal
        title={currentVideo ? currentVideo.title : ""}
        isOpen={isVideoOpen}
        bottomCloseButtonLabel="Voltar"
        onClose={closeVideo}
        className={styles["video-modal"]}
        bodyClassName={styles["video-modal__body"]}
        label="video-Modal"
      >
        <div className={styles["video-modal__video-container"]}>
          {currentVideo?.youtube_url ? (
            <iframe src={currentVideo.youtube_url}></iframe>
          ) : (
            <> </>
          )}
        </div>
      </Modal>
    </section>
  );
}
