import { Link } from "@/components/Common/Link";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { Card } from "@/endpoints/fetchRecommendedWalletPageData";

import styles from "./styles.module.scss";

export function CardCarousel({
  title,
  description,
  link,
  avatar1,
  avatar2,
  date,
  titleAvatar,
  icon,
  graphicIcon1,
  graphicIcon2,
  graphicNumber1,
  graphicNumber2,
  graphicText1,
  graphicText2
}: Card) {
  return (
    <li className={styles["card-container"]}>
      <h1>{title}</h1>
      <h4>{date}</h4>
      <p>{description}</p>
      <div className={styles["card-container__bottom-container"]}>
        <div className={styles["card-container__graphic-outer-container"]}>
          <hr />
          <div className={styles["card-container__graphic-container"]}>
            <div
              className={styles["card-container__graphic-container__graphic1"]}
            >
              <h5>
                <StrapiImage src={graphicIcon1.data.attributes.url} />
                {graphicNumber1}
              </h5>
              <p>{graphicText1.toUpperCase()}</p>
            </div>
            <div
              className={styles["card-container__graphic-container__graphic2"]}
            >
              <h5>
                <StrapiImage src={graphicIcon2.data.attributes.url} />
                {graphicNumber2}
              </h5>
              <p>{graphicText2.toUpperCase()}</p>
            </div>
          </div>
          <hr />
        </div>
        <div className={styles["card-container__avatars"]}>
          <StrapiImage src={icon.data.attributes.url} />
          <StrapiImage src={avatar1.data.attributes.url} />
          <StrapiImage src={avatar2.data.attributes.url} />
          <h5>{titleAvatar}</h5>
        </div>
        <Link variant="contained" href={link.Url} target={link.Target}>
          {link.Label}
        </Link>
      </div>
    </li>
  );
}
