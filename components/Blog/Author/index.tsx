import { PencilOutline } from "@/icons/PencilOutline";
import styles from "./styles.module.scss";

interface Props {
  author: string;
}

export function Author(props: Props) {
  const { author } = props;

  return (
    <strong className={styles.author}>
      <PencilOutline />
      {author}
    </strong>
  );
}
