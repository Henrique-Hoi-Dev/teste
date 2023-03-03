import React from "react";
import styles from "./styles.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  data?: Array<{
    id: number;
    label?: string;
    value?: string;
  }>;
  error?: boolean;
  errorMessage?: string;
  name: string;
}

export function Select(props: Props) {
  const { id, label, className, name, data, error, errorMessage = "" } = props;

  const customInputClassName = error
    ? styles["select-container__input--error"]
    : "";

  return (
    <fieldset className={`${styles["select-container"]} ${className}`}>
      <label htmlFor="name" className={styles["select-container__label"]}>
        {label}
      </label>
      {data && (
        <div className={styles["select-container__wrapper"]}>
          <select
            className={`${styles["select-container__input"]} ${customInputClassName}`}
            name={name}
          >
            {data.map((item) => (
              <option key={item.id} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      )}
      {error && errorMessage && (
        <span className={styles["select-container__errorMessage"]}>
          {errorMessage}
        </span>
      )}
    </fieldset>
  );
}
