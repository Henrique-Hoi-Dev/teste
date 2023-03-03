import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Videos, CardVideo } from "@/interfaces/CardVideo";
import { BsArrowRightShort } from "react-icons/bs";
import { Modal } from "@/components/Common/Modal";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { Button } from "../Button";

export function CardVideo(props: CardVideo) {
  const { videoOfTheCards, title } = props;

  const [pageVideo, setPageVideo] = useState(0);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Videos | null>(null);

  const handlePage = (i: number) => {
    setPageVideo(i);
  };

  const openVideo = (video: Videos) => {
    setIsVideoOpen(true);
    setCurrentVideo(video);
  };

  const closeVideo = () => {
    setCurrentVideo(null);
    setIsVideoOpen(false);
  };

  const renderVideos = () =>
    videoOfTheCards[pageVideo] && (
      <div className={styles["video-card__video"]}>
        <StrapiImage
          src={videoOfTheCards[pageVideo].thumbnail.data.attributes.url}
          onClick={() => openVideo(videoOfTheCards[pageVideo])}
        />
        <div className={styles["video-card__video__text-content"]}>
          <h3 className={styles["video-card__title"]}>
            {videoOfTheCards[pageVideo].title}
          </h3>
          <h4 className={styles["video-card__sub-title"]}>
            {videoOfTheCards[pageVideo].subTitle}
          </h4>
          <p className={styles["video-card__description"]}>
            {videoOfTheCards[pageVideo].description}
          </p>
          <Button
            buttonType="primary"
            onClick={() => openVideo(videoOfTheCards[pageVideo])}
          >
            {videoOfTheCards[pageVideo].labelButtonWatch}
          </Button>
        </div>
      </div>
    );

  return (
    <section className={styles["video-card"]}>
      <h2>{title}</h2>
      <div className={styles["video-card__container"]}>
        <div className={styles["video-card__video-container"]}>
          {videoOfTheCards[pageVideo] && renderVideos()}
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
        </div>

        <div className={styles["video-card__video-list-names"]}>
          <ul>
            {videoOfTheCards.map((item, i) => (
              <li key={item.id}>
                <Button
                  buttonType="terciary"
                  className={styles["video-card__video-links"]}
                  icon={<BsArrowRightShort />}
                  onClick={() => handlePage(i)}
                >
                  {item.title}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
