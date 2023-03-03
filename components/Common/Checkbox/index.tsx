import React from "react";
import styles from "./styles.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mask?: string;
  error?: boolean;
  errorMessage?: string;
  classNameCheckbox?: string;
}

export function Checkbox(props: Props) {
  const {
    id,
    label,
    className,
    classNameCheckbox,
    color,
    ...rest
  } = props;


  return (
    <fieldset className={`${styles["input-container"]} ${className}`}>
      <input type="checkbox" className={`${styles["input-container__check"]} ${classNameCheckbox}`} {...rest}/> 
      <label htmlFor="name" className={styles["input-container__label"]}>
        {label}
      </label>
      <div className={`${styles["input-container__box"]} ${color}`}> </div>
    </fieldset>
  );
}
