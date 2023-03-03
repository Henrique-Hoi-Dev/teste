import { LoadingIcon } from "@/icons/LoadingIcon";
import styles from "./styles.module.scss";

interface ILoaderProps {
  className?: string;
  stroke?: string;
}

export function Loader({ className, stroke }: ILoaderProps) {
  const iconProps = {
    className: `${styles.loader} ${className}`,
    stroke
  };

  return <LoadingIcon {...iconProps} />;
}
