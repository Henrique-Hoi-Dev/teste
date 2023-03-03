import { Link } from "@/components/Common/Link";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { Card as CardAdvice } from "@/endpoints/fetchAdvice";

import styles from "./styles.module.scss";

export function Card(props: CardAdvice) {
  const { title, subTitle, description, iconString, icon, link } = props;

  return (
    <li className={styles["card"]}>
      <div className={styles["card__container"]}>
        <div className={styles["card__container__img"]}>
          <StrapiImage
            src={iconString}
            alt={icon.data.attributes.name}
            loading="eager"
          />
        </div>
        <h1>{title}</h1>
        <h5>{subTitle}</h5>
        <p>{description}</p>
        <div className={styles["card__container__button"]}>
          {link && (
            <Link variant="contained" href={link.Url} target={link.Target}>
              {link.Label}
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
