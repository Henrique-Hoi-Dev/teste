import React from "react";
import styles from "./styles.module.scss";
import { StrapiImage as IStrapiImage } from "@/interfaces/StrapiImage";
import { StrapiImage } from "@/components/Common/StrapiImage";

interface ObjectivesCardProps {
  title: string;
  description: string;
  icon: IStrapiImage;
}

const ObjectivesCard = ({ title, description, icon }: ObjectivesCardProps) => {
  const { alternativeText, url } = icon.data.attributes;
  return (
    <div className={styles["objectives-card"]}>
      <header>
        <>
          <StrapiImage src={url} alt={alternativeText} />
          <strong>
            {title}
            <div />
          </strong>
        </>
      </header>
      <p>{description}</p>
    </div>
  );
};

export default ObjectivesCard;
