import { StrapiImage } from "@/interfaces/StrapiImage";
import { StrapiLink } from "@/interfaces/StrapiLink";
import { Card } from "./Card";
import styles from "./styles.module.scss";

interface VerticalCardListProps {
  cards: Array<{
    title: string;
    description: string;
    image: StrapiImage;
    link?: StrapiLink;
  }>;
  id?: string;
  className?: string;
}

export function VerticalCardList({
  cards,
  id,
  className
}: VerticalCardListProps) {
  return (
    <section
      id={id}
      className={`${styles["vertical-cards-list"]} ${className}`}
    >
      <ul>
        {cards.map((card, index) => (
          <Card
            key={card?.title + index}
            index={index}
            length={cards?.length}
            title={card?.title}
            description={`${card?.description}`}
            image={card?.image}
            link={card?.link}
          />
        ))}
      </ul>
    </section>
  );
}
