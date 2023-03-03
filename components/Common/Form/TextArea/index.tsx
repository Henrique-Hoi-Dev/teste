import React from "react";
import styles from "./styles.module.scss";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  mask?: string;
  error?: boolean;
  errorMessage?: string;
}

export function TextArea(props: Props) {
  const {
    id,
    label,
    className,
    mask,
    error = false,
    errorMessage,
    ...rest
  } = props;

  const customInputClassName = error
    ? styles["input-container__textarea--error"]
    : "";

  return (
    <fieldset className={`${styles["input-container"]} ${className}`}>
      <label htmlFor="name" className={styles["input-container__label"]}>
        {label}
      </label>
      <textarea
        className={`${styles["input-container__textarea"]} ${customInputClassName}`}
        {...rest}
      />

      {error && errorMessage && (
        <span className={styles["input-container__errorMessage"]}>
          {errorMessage}
        </span>
      )}
    </fieldset>
  );
}
