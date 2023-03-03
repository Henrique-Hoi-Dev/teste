import styles from "./styles.module.scss";
import { StrapiFile } from "@/interfaces/StrapiFile";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { createStrapiImageUrl } from "@/utils/createStrapiImageUrl";

interface Props {
  title: string;
  media: StrapiFile;
}

export function DocumentsAccordionItem({ title, media }: Props) {
  return (
    <li className={styles["documents-accordion-item"]}>
      {title}
      <a
        href={createStrapiImageUrl(media.data.attributes.url)}
        download={createStrapiImageUrl(media.data.attributes.url)}
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineCloudDownload
          width={30}
          height={30}
          className={styles["icon"]}
        />
      </a>
    </li>
  );
}
