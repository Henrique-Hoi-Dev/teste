import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { FullWidthBackgroundContainer } from "../Common/FullWidthBackgroundContainer";
import { Link } from "@/components/Common/Link";
import { Size } from "@/interfaces/Size";
import styles from "./styles.module.scss";
interface Props extends SimpleBanner {
  size?: Size;
  className?: string;
  classNameContent?: string;
  isFounderPage?: boolean;
  alternative?: string;
  header?: React.ReactNode;
}

export function Banner(props: Props) {
  const {
    title,
    alternative,
    description,
    link,
    image,
    imageMobile,
    className,
    classNameContent,
    size = "large",
    isFounderPage = false,
    header,
    visible = true,
  } = props;

  const founderPageStylization = isFounderPage
    ? {
        className: styles["founder-page-description"],
      }
    : {};

  return (
    <FullWidthBackgroundContainer
      background={image}
      backgroundMobile={imageMobile}
      className={`${styles["banner-container"]} ${className}`}
      size={size}
      visible={visible}
    >
      {header ? header : <> </>}

      <div
        className={`${styles["banner-container__content"]} container ${classNameContent}`}
      >
        <h1>
          {title} <span>{alternative}</span>
        </h1>
        <p {...founderPageStylization}>{description}</p>
        {link && (
          <Link
            href={link.Url}
            target={link.Target}
            variant="contained"
            className={styles["banner-container__content__link"]}
          >
            {link.Label}
          </Link>
        )}
      </div>
    </FullWidthBackgroundContainer>
  );
}
