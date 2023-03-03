import { Link } from "@/components/Common/Link";
import { CardWithBackground as Props } from "@/interfaces/CardWithBackgroud";

import styles from "./styles.module.scss";

export function CardWithBackground({
  title,
  link,
  textAlt,
  description,
  isBeAnAdvisorCard
}: Props) {
  return (
    <li
      className={`${styles["card-container"]} ${
        isBeAnAdvisorCard && styles["no-inner-shadow"]
      }`}
    >
      <div className={styles["card-container__title"]}>
        <h4>{title}</h4> {textAlt && <strong>{textAlt}</strong>}
      </div>
      <p className={styles["card-container__description-cart"]}>
        {description}
      </p>
      <div>
        {link && (
          <Link variant="contained" href={link.Url} target={link.Target}>
            {link.Label}
          </Link>
        )}
      </div>
    </li>
  );
}
