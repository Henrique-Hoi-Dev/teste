import React from "react";
import styles from "./styles.module.scss";
import { StrapiImage as IStrapiImage } from "@/interfaces/StrapiImage";
import { StrapiImage } from "@/components/Common/StrapiImage";

interface MapCardProps {
  title: string;
  year: string;
  description: string;
  icon: IStrapiImage;
}

const MapCard = ({ title, year, icon, description }: MapCardProps) => {
  const { alternativeText, url } = icon.data.attributes;
  return (
    <div className={styles["map-card"]}>
      <header>
        <StrapiImage src={url} alt={alternativeText} />
        <p>{year}</p>
        <strong>
          {title}
          <div />
        </strong>
      </header>
      <p>{description}</p>
    </div>
  );
};

export default MapCard;
