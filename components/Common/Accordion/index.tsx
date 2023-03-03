/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/Common/Button";
import { ChevronDown } from "@/icons/ChevronDown";
import { ChevronUp } from "@/icons/ChevronUp";
import { useState } from "react";
import styles from "./styles.module.scss";

interface AccordionProps {
  title: string;
  subtitle?: string;
  description: string;
  shownDescriptionText?: string;
  hiddenDescriptionText?: string;
}

export function Accordion({
  title,
  subtitle,
  description,
  shownDescriptionText = "Esconder mensagem",
  hiddenDescriptionText = "Ver mensagem",
}: AccordionProps) {
  const [shouldShowDescription, setShouldShowDescription] = useState(false);

  function handleToggleShouldShowSpeechDescription() {
    setShouldShowDescription((oldState) => !oldState);
  }

  return (
    <section
      aria-labelledby="accordion"
      className={styles["accordion-container"]}
    >
      <h3 id="accordion">{title}</h3>
      {subtitle && <p>{subtitle}</p>}

      <Button
        data-testid="accordion-button"
        buttonType="primary"
        onClick={handleToggleShouldShowSpeechDescription}
      >
        <div className={styles["accordion-button"]}>
          {shouldShowDescription ? (
            <>
              <span>{shownDescriptionText}</span>
              <ChevronUp />
            </>
          ) : (
            <>
              <span>{hiddenDescriptionText}</span>
              <ChevronDown />
            </>
          )}
        </div>
      </Button>
      {shouldShowDescription && <p>{description}</p>}
    </section>
  );
}
