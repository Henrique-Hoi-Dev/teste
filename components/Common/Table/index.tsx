import React from "react";
import { TableRow } from "./TableRow";
import styles from "./styles.module.scss";

interface Props {
  header: Array<string>;
  rows: Array<string[]>;
  className?: string;
}

export function Table(props: Props) {
  const { header, rows, className } = props;

  return (
    <table className={`${styles["table-container"]} ${className}`}>
      <thead>
        <tr>
          {header.map((data, index) => (
            <th  key={data}>
              {data}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((column) => {
          const id = Math.floor(Math.random() * 1000);
          return <TableRow key={id} columns={column} />;
        })}
      </tbody>
    </table>
  );
}
