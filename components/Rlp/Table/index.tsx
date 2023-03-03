import { Table } from "@/endpoints/fetchRLPPageData";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import styles from './styles.module.scss'
import { GridMobile } from './grid-mobile';
import { TableMobile } from './tableMobile';

interface Props {
  title3: string;
  description3: string;
  subDescription3: string;
  table: Table;
}

export function Table({
  title3,
  description3,
  subDescription3,
  table,
}: Props) {

  return (
    <section className={styles["rlp-section__table-contant"]}>
      <div className={styles["rlp-section__table-contant__text"]}>
        <h1>{title3}</h1>
        <p>{description3}</p>
      </div>

      <div className={styles["rlp-section__table-contant__table"]}>
        <h4>{table.title.toUpperCase()}</h4>
        <h5>{table.subTitle}</h5>

        <GridMobile table={table} />
        
        <TableMobile table={table} />

        <table className={styles["rlp-section__table-contant__table__table1"]}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>{table.titleColumn}</th>
              <th>{table.titleColumn2}</th>
              <th>{table.titleColumn3}</th>
              <th style={{ textAlign: "right" }}>{table.titleColumn4}</th>
            </tr>
          </thead>
          <tbody>
            {table.arrayTable.map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: "left" }}>{item.column}</td>
                <td style={{ textAlign: "center" }}>{item.column2}</td>
                <td style={{ textAlign: "center" }}>{item.column3}</td>
                <td style={{ textAlign: "right" }}>{item.column4}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className={styles["rlp-section__table-contant__table__table2"]}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>{table.titleTableColumn}</th>
              <th style={{ textAlign: "right" }}>{table.titleTable2Column}</th>
            </tr>
          </thead>
          <tbody>
            {table.arrayTable2.map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: "left" }}>{item.column}</td>
                <td style={{ textAlign: "right" }}>{item.column2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles["rlp-section__table-contant__sub-description"]}>
        <ReactMarkdown>{subDescription3}</ReactMarkdown>
      </div>
    </section>
  )
}