import styles from "./styles.module.scss";

interface Props {
  columns: Array<String>;
}

export function TableRow(props: Props) {
  const { columns } = props;

  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index}> {column} </td>
      ))}
    </tr>
  );
}
