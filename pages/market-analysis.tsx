import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { MarketAnalysisData, fetchMarketAnalysisData } from "@/endpoints/index";
import { VerticalCardList } from "@/components/MarketAnalysis/VerticalCardsList";
import { Card } from "@/components/MarketAnalysis/Card";
import { CardVideo } from "@/components/MarketAnalysis/CardVideo";
import { CardsCarousel } from "@/components/Common";
import ScrollContainer from "react-indiana-drag-scroll";
import styles from "@/styles/market.module.scss";

type Props = MarketAnalysisData["data"]["attributes"];

export default function MarketAnalysis(props: Props) {
  const {
    description,
    cards,
    title,
    cardReports,
    cardsVideo,
    descriptionReport,
    titleReport,
    titleVideo,
  } = props;

  return (
    <>
      <Head>
        <title>Mirae | Análises de mercado</title>
        <meta name="description" content="Mirae Assets" />
      </Head>
      <section className={styles["market-section"]}>
        <div className={styles["market-section__title"]}>
          <div className={styles["market-section__title__content"]}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </section>

      <section className={styles["market-section__card1"]}>
        <div className="container">
          <VerticalCardList
            cards={cards}
            className={`${styles["card-content"]}`}
          />
        </div>
      </section>

      <section className={styles["market-section__card-content"]}>
        <div className="container">
          <h1 className={styles["market-section__card-content__title"]}>
            {titleReport}
          </h1>
          <div className={styles["market-section__scroll-container-wrapper"]}>
            <CardsCarousel
              itemsLength={cardReports.length}
              className={styles["market-section__card-content__list"]}
              customBreakpoint={{
                desktop: 3,
                tablet: 2,
                mobile: 1,
              }}
            >
              {cardReports.map((item, i) => (
                <Card
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  downloadReport={item.downloadReport}
                  icon={item.icon}
                  link={item.link}
                  subTitle={item.subTitle}
                />
              ))}
            </CardsCarousel>
          </div>
          <p>{descriptionReport}</p>
        </div>
      </section>

      <div className="container">
        <section className={styles["market-section__card-videos"]}>
          <h1 className={styles["market-section__card-videos__title"]}>
            {titleVideo}
          </h1>
          <div className={styles["market-section__card-videos__contant"]}>
            <ScrollContainer
              className={styles["market-section__card-content__list"]}
            >
              {cardsVideo.map((item) => (
                <CardVideo
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  subTitle={item.subTitle}
                  thumbnail={item.thumbnail}
                  labelButtonWatch={item.labelButtonWatch}
                  youtube_url={item.youtube_url}
                />
              ))}
            </ScrollContainer>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const whatWeDoData = await fetchMarketAnalysisData();

    return {
      props: {
        ...whatWeDoData.data.attributes,
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
