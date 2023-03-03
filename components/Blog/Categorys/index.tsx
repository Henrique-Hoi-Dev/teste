import styles from "./styles.module.scss";

interface Props {
  categorys: Array<{
    id: number;
    category: string;
  }>;
}

export function Categorys(props: Props) {
  const { categorys } = props;

  if (!categorys.length) return <> </>;

  return (
    <ul className={styles.categorys}>
      {categorys &&
        categorys.map((category) => (
          <li key={category.id}> {category.category} </li>
        ))}
    </ul>
  );
}
