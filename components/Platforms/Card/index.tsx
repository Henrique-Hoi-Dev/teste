import { Link } from "@/components/Common/Link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  description: string;
  labelButton: string;
  href: string;
}

export function Card(props: CardProps) {
  const {
    title,
    description,
    labelButton,
    href,
  } = props;

  return (
    <li className={styles.card}>
      <h3 className={styles["card__title"]}>{title}</h3>

      <ReactMarkdown className={styles["card__description"]}>{description}</ReactMarkdown>

      <Link href={href} variant="contained">
        {labelButton}
      </Link>
    </li>
  );
}
