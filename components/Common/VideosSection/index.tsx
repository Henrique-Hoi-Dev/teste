import React from "react";
import { CardVideo } from "@/components/Common/CardVideo";
import { CardVideo as CardVideoProps } from "@/interfaces/CardVideo";
import styles from "./styles.module.scss";

export function VideosSection(props: CardVideoProps) {
  if (!props?.videoOfTheCards?.length) return <> </>;

  return (
    <section className={styles["videos-section-container"]}>
      <div className="container">
        <CardVideo {...props} />
      </div>
    </section>
  );
}
