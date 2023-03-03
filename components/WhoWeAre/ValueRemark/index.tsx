import React from "react";
import styles from "./styles.module.scss";

interface ValueRemarkProps {
  value: string;
  title: string;
  currency: string;
  description: string;
}

export default function NumbersCards({
  value,
  title,
  currency,
  description
}: ValueRemarkProps) {
  return (
    <section className={styles["value-remark"]}>
      <div className={styles["value-remark__divider"]} />
      <div className={styles["value-remark__content-container"]}>
        <h3>{title}</h3>
        <div className={styles["value-remark__value-container"]}>
          <p>{currency}</p>
          <h1>{value}</h1>
          <label>{description}</label>
        </div>
      </div>
    </section>
  );
}
