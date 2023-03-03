import { Card } from "@/endpoints/fetchRecommendedWalletPageData";
import { CardCarousel } from "../Card";
import ScrollContainer from "react-indiana-drag-scroll";

import styles from "./styles.module.scss";

interface Props {
  title: string;
  cards: Array<Card>;
}

export function Card({ title, cards }: Props) {
  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-container__header"]}>
        <h4>{title}</h4>
        <div className={styles["card-container__divider"]} />
      </div>
      <div className={styles["card-container__cards"]}>
        <ScrollContainer className={styles["card-container__list"]}>
          {cards.map((item) => (
            <CardCarousel
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              date={item.date}
              graphicText1={item.graphicText1}
              graphicText2={item.graphicText2}
              titleAvatar={item.titleAvatar}
              icon={item.icon}
              graphicNumber1={item.graphicNumber1}
              graphicNumber2={item.graphicNumber2}
              avatar1={item.avatar1}
              avatar2={item.avatar2}
              graphicIcon1={item.graphicIcon1}
              graphicIcon2={item.graphicIcon2}
              link={item.link}
            />
          ))}
        </ScrollContainer>
      </div>
    </div>
  );
}
