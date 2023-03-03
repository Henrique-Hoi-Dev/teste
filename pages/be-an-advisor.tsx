import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { fetchBeAnAdvisorData, BeAnAdvisorData } from "@/endpoints/index";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { CardCarousel } from "@/components/Common/CardCarousel";
import { Banner } from "@/components/Banner";
import { FrequentlyAskedQuestions } from "@/components/Common/FrequentlyAskedQuestions";
import { BeAnAdvisorForm } from "@/components/BeAnAdvisor/Form";

import styles from "@/styles/beAnAdvisor.module.scss";

type Props = BeAnAdvisorData["data"]["attributes"];

const slidesConfig = {
  desktop: 2,
  mobile: 1,
  tablet: 1.3,
};

export default function BeAnAdvisor(props: Props) {
  const { banner, cardContent, product_items_content, form } = props;

  return (
    <>
      <Head>
        <title>Mirae | Seja um Assessor</title>
        <meta name="description" content="Mirae Asset" />
      </Head>

      <Banner
        {...banner}
        link={{
          ...banner.link,
          Url: "#beAnAdvisorQuestions",
        }}
        className={`${styles["banner"]}`}
      />

      <div className="container">
        <section className={styles["beAnAdvisor-section__cards"]}>
          <CardCarousel
            id={cardContent?.id}
            title={cardContent.title}
            cards={cardContent.cards}
            isBeAnAdvisorCard
            wrapperClassName={styles["beAnAdvisor-section__cards-carousel"]}
            cardClassName={styles["beAnAdvisor-section__cards-carousel__card"]}
            slidesPerBreakpoint={slidesConfig}
          />
        </section>
      </div>

      <section
        className={styles["beAnAdvisor-section__product-itens"]}
        id="beAnAdvisorQuestions"
      >
        <div className="container">
          <FrequentlyAskedQuestions
            title={product_items_content.title}
            items={product_items_content.product_items}
            numberItem={true}
            statusItem={true}
          />
          <BeAnAdvisorForm {...form} />
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const beAnAdvisorData = await fetchBeAnAdvisorData();

    return {
      props: {
        ...beAnAdvisorData?.data?.attributes,
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
