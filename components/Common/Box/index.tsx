import React from "react";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Box({ className = "", children }: Props) {
  return (
    <div className={`${styles["box-container"]} ${className}`}>{children}</div>
  );
}

export default Box;
