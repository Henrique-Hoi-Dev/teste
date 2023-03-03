import React from "react";
import styles from "./styles.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function GenericCard({ title, children, className }: Props) {
  return (
    <div className={`${styles["info-card"]} ${className}`}>
      <div>
        <h4>{title}</h4>
        <div />
      </div>
      {children}
    </div>
  );
}
