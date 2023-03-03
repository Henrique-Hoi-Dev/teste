import { Link } from '@/components/Common/Link';
import styles from './styles.module.scss';

interface AgentTitleProps {
  title: string;
  text: string;
  url: string;
  urlLabel: string;
}

export function AgentTitle({ title, text, url, urlLabel }: AgentTitleProps) {
  return (
    <section aria-labelledby='agent-title' className={styles['agent-title']}>
      <h1 id='agent-title'>{title}</h1>
      <p>
        {`${text} `}

        <Link href={url}>{urlLabel}</Link>
      </p>
    </section>
  );
}
