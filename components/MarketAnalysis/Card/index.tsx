import { Link } from '@/components/Common/Link'
import { Card } from '@/endpoints/fetchAdvice'
import { createStrapiImageUrl } from '@/utils/createStrapiImageUrl'
import ReactMarkdown from 'react-markdown'

import styles from './styles.module.scss'

export function Card(props: Card) {
  const { title, subTitle, description, link, downloadReport } = props

  return (
    <li className={styles['card']}>
      <div className={styles['card__container']}>
        <div>
          <h1>{title}</h1>
          <h5>{subTitle}</h5>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
        <div className={styles['card__container__button']}>
          {link && (
            <Link variant="contained" href={link.Url} target={link.Target}>
              {link.Label}
            </Link>
          )}
          {downloadReport?.media.data?.attributes?.url && (
            <Link
              variant="contained"
              href={createStrapiImageUrl(
                downloadReport?.media?.data?.attributes?.url,
              )}
              target={'_blank'}
            >
              {downloadReport.title}
            </Link>
          )}
        </div>
      </div>
    </li>
  )
}
