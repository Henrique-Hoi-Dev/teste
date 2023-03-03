import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { AdviceData, fetchAdvice } from "@/endpoints/index";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { createStrapiImageUrl } from "@/utils/createStrapiImageUrl";
import { Link } from "@/components/Common/Link";
import { Banner } from "@/components/Banner";
import { FrequentlyAskedQuestions } from "@/components/Common/FrequentlyAskedQuestions";
import { isMobile } from "@/utils/hooks/isMobile";
import { Card } from "@/components/Advice/Card";

import styles from "@/styles/advice.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";

type Props = AdviceData["data"]["attributes"];

export default function Advice(props: Props) {
  const {
    banner,
    cardInfoText,
    listText,
    cards,
    descriptionCards,
    titleCards,
  } = props;

  const backgroundInfoUrl = createStrapiImageUrl(
    cardInfoText.image.data.attributes.url
  );
  const backgroundInfoMobileUrl = createStrapiImageUrl(
    cardInfoText.imageMobile.data.attributes.url
  );

  const mobile = isMobile();

  const backgroundImageInfo = mobile
    ? backgroundInfoMobileUrl
    : backgroundInfoUrl;

  return (
    <>
      <Head>
        <title> Mirae | Advice</title>
      </Head>
      <main className={styles["advice-section"]}>
        <Banner
          {...banner}
          link={{
            ...banner.link,
            Url: "#advice-cards",
          }}
          className={`${styles["banner"]}`}
        />
        <section className={styles["advice-section__text-content"]}>
          <div className="container">
            <div className={styles["advice-section__text-content__cards"]}>
              <FrequentlyAskedQuestions
                title={listText.title}
                items={listText.contents}
                numberItem={false}
                statusItem={true}
              />
            </div>
          </div>
        </section>
        <section
          id="advice-cards"
          className={styles["advice-section__card-content"]}
        >
          <div className="container">
            <h1 className={styles["advice-section__card-content__title"]}>
              {titleCards}
            </h1>
            <p className={styles["advice-section__card-content__description"]}>
              {descriptionCards}
            </p>
            <div className={styles["advice-section__card-content__wrapper"]}>
              <ScrollContainer
                className={styles["advice-section__card-content__list"]}
              >
                {cards.map((item) => (
                  <Card
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    iconString={item.icon.data.attributes.url}
                    subTitle={item.subTitle}
                    link={item.link}
                  />
                ))}
              </ScrollContainer>
            </div>
          </div>
        </section>
        <section className={styles["advice-section"]}>
          <div
            className={styles["advice-section__text-info"]}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), 
              radial-gradient(50% 50% at 50% 50%, rgba(34, 34, 34, 0.58) 0%, rgba(34, 34, 34, 0.71) 100%), 
              url(${backgroundImageInfo})`,
            }}
          >
            <div className={styles["advice-section__text-info__content"]}>
              <h1>{cardInfoText.title}</h1>
              <p>{cardInfoText.description}</p>
              <Link
                variant="contained"
                href={cardInfoText.link.Url}
                target={cardInfoText.link.Target}
              >
                {cardInfoText.link.Label}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const adviceData = await fetchAdvice();

    return {
      props: {
        ...adviceData.data.attributes,
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
