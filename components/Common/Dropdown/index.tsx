import React, { useState } from "react";
import { NavArrowDown } from "@/icons/index";
import { Button } from "@/components/Common/Button";
import styles from "./styles.module.scss";

interface Props {
  actionButtonTitle: string;
  onActionButtonClick?: () => {};
  className?: string;
  listWrapperClassName?: string;
  children: React.ReactNode;
}

export function Dropdown(props: Props) {
  const {
    className,
    listWrapperClassName,
    actionButtonTitle,
    onActionButtonClick,
    children,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={`${styles.dropdown} ${className}`}>
      <div
        role="button"
        className={styles["dropdown__open-button-container"]}
        onClick={toggleList}
        aria-label="open-dropdown-button"
      >
        <Button onClick={onActionButtonClick} buttonType="terciary">
          {actionButtonTitle}
        </Button>
        <NavArrowDown aria-pressed={isOpen} />
      </div>
      {isOpen && (
        <ul className={`${styles.dropdown__items} ${listWrapperClassName}`}>
          {children}
        </ul>
      )}
    </div>
  );
}
