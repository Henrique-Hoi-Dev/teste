import ReactMarkdown from "react-markdown";
import { FullWidthBackgroundContainer } from "@/components/Common/FullWidthBackgroundContainer";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { Link } from "@/components/Common/Link";
import styles from "./styles.module.scss";

interface Props {
  banner: SimpleBanner;
  bannerSize?: "small" | "medium" | "large";
}

export function SmallBanner({ banner, bannerSize }: Props) {
  return (
    <FullWidthBackgroundContainer
      className={styles["informative-banner"]}
      background={banner.image}
      backgroundMobile={banner?.imageMobile}
      defaultHeight={false}
      size={bannerSize}
      visible={banner?.visible}
    >
      <div className={`${styles["informative-banner__content"]} full-width`}>
        <h3>{banner.title} </h3>
        <ReactMarkdown>{banner.description}</ReactMarkdown>
        <Link
          href={banner.link?.Url}
          target={banner.link?.Target}
          variant="contained"
        >
          {banner.link?.Label}
        </Link>
      </div>
    </FullWidthBackgroundContainer>
  );
}
