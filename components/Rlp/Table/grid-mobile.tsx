import { Table } from '@/endpoints/fetchRLPPageData'
import styles from './styles.module.scss'

interface Props  {
  table: Table;
}
export function GridMobile({ table }: Props) {
  return (
    <div className={styles["rlp-section__grid-contant"]}>
      {table?.arrayTable.map((item, i) => (
        <div key={i} className={styles["rlp-section__grid-contant__grid"]}>
          <h4>{table.titleColumn}</h4>
          <h5>{item.column}</h5>        
          <h4>{table.titleColumn2}</h4>
          <h5>{item.column2}</h5>         
        </div>        
      ))}

      {table?.arrayTable.map((item, i) => (
        <div key={i} className={styles["rlp-section__grid-contant__grid2"]}>
          <hr />
          <h4>{table.titleColumn3}</h4>
          <h5>{item.column3}</h5>         
          <h4>{table.titleColumn4}</h4>
          <h5>{item.column4}</h5>         
        </div>        
      ))}
    </div>
  )
}