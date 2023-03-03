import { StrapiImage } from "@/interfaces/StrapiImage";
import styles from "./styles.module.scss";

interface Props {
  background: StrapiImage;
  backgroundMobile?: StrapiImage;
  className?: string;
  children: React.ReactNode;
  size?: "large" | "medium" | "small";
  id?: string;
  defaultHeight?: boolean;
  visible?: boolean;
}

export function FullWidthBackgroundContainer({
  background,
  backgroundMobile,
  className,
  children,
  defaultHeight = true,
  visible = true,
  ...rest
}: Props) {
  const backgroundUrl = background?.data?.attributes?.url;

  const additionalClassName = defaultHeight
    ? styles["background-container__default-height"]
    : "";

  if (visible === false) return <> </>;

  return (
    <section
      style={{
        background: `url(${backgroundUrl})`,
      }}
      className={`${styles["background-container"]} ${additionalClassName} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}
