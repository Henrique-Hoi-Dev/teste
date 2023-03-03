import { Table } from '@/endpoints/fetchRLPPageData'
import styles from './styles.module.scss'

interface Props {
  table: Table;
}

export function TableMobile({
  table,
}: Props) {
  return (
    <div className={styles["rlp-section__table-contant__table-mobile"]}>
      <table>
        <thead>
          <tr>
            <th>{table.titleTableColumn}</th>
          </tr>
        </thead>
        <tbody>
          {table.arrayTable2.map((item) => (
            <tr key={item.id}>
              <td style={{ textAlign: "left" }}>{item.column}</td>
            </tr>
          ))}
        </tbody>
      </table> 

      <table>
        <thead>
          <tr>
            <th>{table.titleTable2Column}</th>
          </tr>
        </thead>
        <tbody>
          {table.arrayTable2.map((item) => (
            <tr key={item.id}>
              <td style={{ textAlign: "left" }}>{item.column2}</td>
            </tr>
          ))}
        </tbody>
      </table>      
    </div>
  )
}