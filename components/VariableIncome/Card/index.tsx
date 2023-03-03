import { Link } from "@/components/Common/Link";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { StrapiLink } from "@/interfaces/StrapiLink";

import styles from "./styles.module.scss";

interface Card {
  title: string;
  description: string;
  link: StrapiLink;
  icon: string;
  alt: string;
  noBorderRadius?: boolean;
}

export function Card(props: Card) {
  return (
    <li
      className={styles["card-container"]}
      style={{
        borderRadius: props.noBorderRadius ? 0 : "1rem"
      }}
    >
      <div className={styles["card-container__icon"]}>
        <StrapiImage src={props.icon} alt={props.alt} />
        <h4>{props.title}</h4>
      </div>
      <p>{props.description}</p>
      <div>
        {props.link && (
          <Link
            variant="contained"
            href={props.link.Url}
            target={props.link.Target}
          >
            {props.link.Label}
          </Link>
        )}
      </div>
    </li>
  );
}
