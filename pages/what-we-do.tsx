import React from "react";
import { GetStaticProps } from "next";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { WhatWeDoData, fetchWhatWeDoData } from "@/endpoints/index";
import { Banner } from "@/components/Banner";
import { VerticalCardList } from "@/components/Common/VerticalCardsList";
import { FrequentlyAskedQuestions } from "@/components/Common/FrequentlyAskedQuestions";

import Head from "next/head";
import styles from "../styles/WhatWeDo.module.scss";

type Props = WhatWeDoData["data"]["attributes"];

export default function WhatWeDo(props: Props) {
  const { banner, description, cards, cardText, titleCardText } = props;

  return (
    <>
      <Head>
        <title>Mirae | O que fazemos</title>
        <meta name="description" content="Mirae Asset" />
      </Head>

      <Banner {...banner} classNameContent={`${styles["banner"]}`} />

      <section className={styles["whoWeAre-section"]}>
        <div className="container">
          <p className={styles["whoWeAre-section__description"]}>
            {description}
          </p>
          <VerticalCardList
            cards={cards}
            className={`${styles["card-content"]}`}
          />
        </div>
      </section>
      <section className={styles["whoWeAre-section__content"]}>
        <div className="container">
          <FrequentlyAskedQuestions
            title={titleCardText}
            items={cardText}
            numberItem={true}
            statusItem={false}
          />
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const whatWeDoData = await fetchWhatWeDoData();

    return {
      props: {
        ...whatWeDoData?.data?.attributes,
      },
      revalidate: PAGE_REGENERATION_TIME,
    };
  } catch (err) {
    return {
      props: {
        error: true,
      },
    };
  }
};
