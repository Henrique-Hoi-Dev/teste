import { StrapiImage } from "@/interfaces/StrapiImage";
import { createStrapiImageUrl } from "@/utils/createStrapiImageUrl";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import styles from "./styles.module.scss";

interface Props {
  background: StrapiImage;
  backgroundMobile?: StrapiImage;
  className?: string;
  children: React.ReactNode;
  size?: "large" | "medium" | "small";
  id?: string;
}

export function FullWidthSmallBanner({
  background,
  backgroundMobile,
  className,
  children,
  size = "medium",
  ...rest
}: Props) {
  const screenType = GetScreenType();

  const backgroundData = background.data.attributes;

  const imageUrlBySize = {
    large: backgroundData?.formats?.large?.url
      ? backgroundData.formats.large.url
      : backgroundData.url,
    medium: backgroundData?.formats?.medium.url,
    small: backgroundData?.formats?.medium.url,
  };

  const getBackgroundUrl = () => {
    if (screenType === "mobile" && backgroundMobile?.data?.attributes?.url)
      return backgroundMobile.data.attributes.url;

    return imageUrlBySize[size];
  };

  const backgroundUrl = createStrapiImageUrl(getBackgroundUrl());

  return (
    <section
      style={{
        background: `url(${backgroundUrl})`,
      }}
      className={`${styles["small-background-container"]} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}
