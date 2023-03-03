import React from "react";
import { Videos } from "@/interfaces/CardVideo";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { Link } from "@/components/Common/Link";

import styles from "./styles.module.scss";

export function CardVideo(props: Videos) {
  const { title, description, labelButtonWatch, thumbnail, youtube_url, subTitle } = props;

  return (
    <li className={styles["video-card__video-container"]}>
      <div className={styles["video-card__video"]}>
        <StrapiImage
          src={thumbnail.data.attributes.url}
        />
        <h3 className={styles["video-card__title"]}>
          {title}
        </h3>
        <h4 className={styles["video-card__sub-title"]}>
          {subTitle}
        </h4>
        <p className={styles["video-card__description"]}>
          {description}
        </p>
        <Link variant="contained" href={youtube_url}>
          {labelButtonWatch}
        </Link> 
      </div>      
    </li>
  );
}
