import React from "react";
import styles from "./styles.module.scss";
import InputMask from "react-input-mask";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mask?: string;
  error?: boolean;
  errorMessage?: string;
}

export function Input(props: Props) {
  const {
    id,
    label,
    className,
    mask,
    error,
    errorMessage = "",
    ...rest
  } = props;

  const customInputClassName = error
    ? styles["input-container__input--error"]
    : "";

  return (
    <fieldset className={`${styles["input-container"]} ${className}`}>
      <label htmlFor="name" className={styles["input-container__label"]}>
        {label}
      </label>

      {mask ? (
        <InputMask
          className={`${styles["input-container__input"]} ${customInputClassName}`}
          mask={mask}
          {...rest}
        />
      ) : (
        <input
          className={`${styles["input-container__input"]} ${customInputClassName}`}
          {...rest}
        />
      )}
      {error && errorMessage && (
        <span className={styles["input-container__errorMessage"]}>
          {errorMessage}
        </span>
      )}
    </fieldset>
  );
}
