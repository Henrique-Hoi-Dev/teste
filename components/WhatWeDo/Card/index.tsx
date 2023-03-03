import { StrapiImage } from "@/components/Common/StrapiImage";
import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  titleNumber?: string;
  titleTwo: string;
  description: string;
  img: string;
  alt: string;
}

export function Card(props: CardProps) {
  const { img, alt, description, title, titleTwo, titleNumber } = props;

  return (
    <div className={styles["card"]}>
      <div className={styles["card__investment-principles"]}>
        <h6>{titleTwo}</h6>

        <div className={styles["card__card-container"]}>
          <div className={styles["card__card-title"]}>
            <h1><strong>{titleNumber}</strong>{title}</h1>    
          </div>
          <p>{description}</p>
          <div className={styles["card__img-container"]}>
            <StrapiImage src={img} alt={alt} />
          </div>      
        </div>
      </div>      
    </div>
  );
}
