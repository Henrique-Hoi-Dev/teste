/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss';

interface FounderTitleProps {
  imageUrl: string;
  title: string;
  description: string;
}

export function FounderTitle({
  imageUrl,
  title,
  description,
}: FounderTitleProps) {
  return (
    <section
      aria-labelledby='founder-title'
      className={styles['founder-title']}
    >
      <img data-testid='founder-title-img' src={imageUrl} alt='Mirae founder' />

      <div>
        <h1 id='founder-title'>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
