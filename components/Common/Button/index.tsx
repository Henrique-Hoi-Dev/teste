import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "secondary" | "terciary";
  disabledPartner?: boolean;
  beAnAdvisorForm?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}
export function Button({
  children,
  onClick,
  buttonType,
  beAnAdvisorForm,
  disabledPartner,
  icon,
  disabled,
  ...rest
}: ButtonProps) {
  const buttonTypesClass = {
    primary: "button--primary",
    secondary: "button--secondary",
    terciary: "button--terciary",
  };

  const iconButtonClassName = icon ? styles["button--icon"] : "";

  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${
        styles[buttonTypesClass[buttonType]]
      } button ${iconButtonClassName} ${
        !!disabledPartner && styles["button--disabled-home"]
      } ${!!beAnAdvisorForm && styles["button--be-an-advisor"]}`}
      onClick={onClick}
      {...rest}
    >
      {children} {icon}
    </button>
  );
}
