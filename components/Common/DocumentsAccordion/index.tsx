import { useState } from "react";
import { StrapiFile } from "@/interfaces/StrapiFile";
import { DocumentsAccordionItem } from "./DocumentsAccordionItem";
import { BsChevronDown } from "react-icons/bs";
import styles from "./styles.module.scss";

interface DocumentsAccordionProps {
  title: string;
  reports: Array<{
    id: number;
    title: string;
    media: StrapiFile;
  }>;
  index: number;
}

export function DocumentsAccordion({
  title,
  reports,
  index
}: DocumentsAccordionProps) {
  const [isShown, setIsShown] = useState(false);

  function handleToggleIsShown() {
    setIsShown((oldState) => !oldState);
  }

  return (
    <section className={styles["documents-accordion"]}>
      <header
        role="button"
        onClick={handleToggleIsShown}
        className={styles["reports-category-header"]}
        aria-pressed={isShown}
      >
        <div className={styles["reports-category-header__index"]}>{index}</div>
        <h4>{title}</h4>
        <div className={styles["reports-category-header__icon-wrapper"]}>
          <BsChevronDown aria-pressed={isShown} />
        </div>
      </header>
      <ul>
        {isShown &&
          reports.map((report) => (
            <DocumentsAccordionItem
              key={report.id}
              title={report.title}
              media={report.media}
            />
          ))}
      </ul>
    </section>
  );
}
