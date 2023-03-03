import styles from "./styles.module.scss";

export interface CarouselItemProps {
  title: string;
  description: string;
  content: string;
  footer: string;
  className?: string;
  classNameContent?: string;
}

export function CarouselItem({
  title,
  description,
  content,
  footer,
  className,
  classNameContent,
}: CarouselItemProps) {
  return (
    <li className={`${styles["carousel-item__container"]}`}>
      <section
        aria-labelledby="carousel-item-introduction"
        className={`${className}`}
      >
        <h4 id="carousel-item-introduction">{title}</h4>
        <p>{description}</p>
      </section>

      <section
        aria-labelledby="carousel-item-details"
        className={`${classNameContent}`}
      >
        <h4 id="carousel-item-details" className="d-none">
          Carousel Item Details
        </h4>
        <p>{content}</p>
        <span>{footer}</span>
      </section>
    </li>
  );
}
