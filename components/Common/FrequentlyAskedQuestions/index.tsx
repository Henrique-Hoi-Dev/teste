import { useEffect, useState } from "react";
import { FrequentlyAskedQuestionsItem } from "./FrequentlyAskedQuestionsItem";
import { Content } from "@/endpoints/fetchAgentPageData";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import styles from "./styles.module.scss";

interface FrequentlyAskedQuestionsProps {
  title: string;
  items: Content[];
  numberItem: Boolean;
  statusItem: Boolean;
  descriptionAsMarkdown?: Boolean;
  customItemIndicator?: React.ReactNode;
  limiter?: number;
  className?: string;
  classNameContent?: string;
}

export function FrequentlyAskedQuestions({
  title,
  items,
  numberItem,
  statusItem,
  descriptionAsMarkdown,
  limiter,
  className,
  customItemIndicator,
  classNameContent,
}: FrequentlyAskedQuestionsProps) {
  const [visibleQuestionsCount, setVisibleQuestionsCount] = useState<number>(
    limiter ? limiter : 5
  );
  const [visibleQuestions, setVisibleQuestions] = useState<Content[]>(items);

  useEffect(() => {
    setVisibleQuestions(items?.slice(0, visibleQuestionsCount));
  }, [visibleQuestionsCount, items]);

  const onShowQuestionsButtonClick = () => {
    if (items.length > visibleQuestions.length) {
      setVisibleQuestionsCount(
        (prevState) => prevState + (limiter ? limiter : 5)
      );
    } else {
      setVisibleQuestionsCount(5);
    }
  };

  const hasMoreQuestionsToShow = items.length > visibleQuestions.length;

  return (
    <section
      aria-labelledby="agent-frequently-asked-questions"
      className={styles["agent-frequently-asked-questions"]}
    >
      <h3 id="agent-frequently-asked-questions">{title}</h3>
      <ul>
        {visibleQuestions.map((question, index) => (
          <FrequentlyAskedQuestionsItem
            key={question.title}
            title={question.title}
            description={question.description}
            index={index}
            statusItem={statusItem}
            numberItem={numberItem || false}
            descriptionAsMarkdown={descriptionAsMarkdown}
            className={className}
            customItemIndicator={customItemIndicator}
            classNameContent={classNameContent}
          />
        ))}
        {items.length > (limiter ? limiter : 5) && (
          <li>
            <header role="button" onClick={onShowQuestionsButtonClick}>
              <div className={styles["agent-frequently-asked-questions-item"]}>
                {hasMoreQuestionsToShow && <AiOutlinePlus />}
                {!hasMoreQuestionsToShow && <AiOutlineMinus />}
              </div>
              <h4>
                {hasMoreQuestionsToShow
                  ? "Mostrar mais perguntas"
                  : "Mostrar menos perguntas"}
              </h4>
            </header>
          </li>
        )}
      </ul>
    </section>
  );
}
