import { StrapiImage } from "@/components/Common/StrapiImage";
import styles from "./styles.module.scss";

interface InfoCardProps {
  title: string;
  description?: string;
  icon?: string;
  alt?: string;
}

export function Card({
  title,
  description,
  icon,
  alt
}: InfoCardProps) {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__icon-title"]}>
        <picture>
          <StrapiImage src={icon} alt={alt} />
        </picture>
        <div className={styles["card__title"]}>
          <h1>{title}</h1>
          <hr />
        </div>
      </div>
      <div className={styles["card__description"]}>
        <p>{description}</p>
      </div>
    </div>
  );
}
