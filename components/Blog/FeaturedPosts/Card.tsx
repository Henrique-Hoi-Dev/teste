import { Author, Categorys } from "@/components/Blog";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./card.styles.module.scss";

interface Props {
  background: string;
  slug: string;
  title: string;
  author: string;
  categorys: Array<{
    id: number;
    category: string;
  }>;
  className?: string;
  target?: string;
  customRoute?: boolean;
}

export function Card(props: Props) {
  const {
    background,
    slug,
    title,
    author,
    categorys,
    className,
    target,
    customRoute = false,
  } = props;

  const router = useRouter();

  const renderContent = () => (
    <li
      style={{
        background: background,
      }}
      className={`${styles["featured-posts__post"]} ${className}`}
      role="button"
      onClick={customRoute ? () => {} : () => router.push(`/blog/${slug}`)}
    >
      <strong>
        <span> {title} </span>
      </strong>
      <div className={styles["featured-posts__info"]}>
        <Author author={author} />
        <Categorys categorys={categorys} />
      </div>
    </li>
  );

  return customRoute ? (
    <Link href={slug || ""}>{renderContent()}</Link>
  ) : (
    renderContent()
  );
}
