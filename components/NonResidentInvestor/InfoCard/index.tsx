import styles from "./styles.module.scss";

interface InfoCardProps {
  title?: string;
  sing: string;
  number: string;
  brokenNumber?: string;
  infoNumber?: string;
}

export function InfoCardNumber({ title, sing, number, brokenNumber, infoNumber}: InfoCardProps) {
  return (
    <div className={styles["info-card"]}>
      <div className={styles["info-card__title"]}>
        <h5>{title}</h5>
      </div>
      <div className={styles["info-card__number"]}>
        <h5>{sing}</h5><h1>{number}{brokenNumber}</h1> 
      </div>
      <div className={styles["info-card__name-value"]}>
        <h5>{infoNumber}</h5> 
      </div>
    </div>
  );
}
