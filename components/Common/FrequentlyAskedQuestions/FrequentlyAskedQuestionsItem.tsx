/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { ChevronDown } from "@/icons/ChevronDown";
import ReactMarkdown from "react-markdown";

interface FrequentlyAskedQuestionsItemProps {
  title: string;
  description: string;
  index: number;
  numberItem: Boolean;
  statusItem: Boolean;
  descriptionAsMarkdown?: Boolean;
  className?: string;
  customItemIndicator?: React.ReactNode;
  classNameContent?: string;
}

export function FrequentlyAskedQuestionsItem({
  title,
  description,
  index,
  numberItem,
  statusItem,
  descriptionAsMarkdown,
  className,
  customItemIndicator,
  classNameContent,
}: FrequentlyAskedQuestionsItemProps) {
  const [isShown, setIsShown] = useState(statusItem);

  function handleToggleIsShown() {
    setIsShown((oldState) => !oldState);
  }

  const renderDescription = () =>
    descriptionAsMarkdown ? (
      <ReactMarkdown
        className={`${styles["agent-frequently-asked-questions-item__description"]} ${className}`}
        children={description}
      />
    ) : (
      <p>{description}</p>
    );

  return (
    <li className={`${classNameContent}`}>
      <header role="button" onClick={handleToggleIsShown}>
        {numberItem && (
          <div className={`${styles["agent-frequently-asked-questions-item"]}`}>
            {index + 1}
          </div>
        )}
        {customItemIndicator ? customItemIndicator : ""}

        <h4>{title}</h4>
        <div className={styles["icon-wrapper"]}>
          <ChevronDown aria-pressed={!!isShown} />
        </div>
      </header>

      {isShown ? renderDescription() : ""}
    </li>
  );
}
