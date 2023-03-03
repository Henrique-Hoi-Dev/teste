import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import styles from "../styles/whoWeAre.module.scss";
import { FullWidthBackgroundContainer } from "../components/Common/FullWidthBackgroundContainer";
import NumberCard from "@/components/WhoWeAre/NumberCard";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import ValueRemark from "@/components/WhoWeAre/ValueRemark";
import { CardsCarousel } from "@/components/Common/CardsCarousel";
import ObjectivesCard from "@/components/WhoWeAre/ObjectivesCard";
import MapCard from "@/components/WhoWeAre/MapCard";
import {
  WhoWeAreData,
  fetchWhoWeAreData,
} from "@/endpoints/fetchWhoWeArePageData";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { TABLET_BREAKPOINT } from "@/utils/breakpoints";
import MapChart from "@/components/WhoWeAre/MapChart";
import { numberCardsExtraArguments } from "@/components/WhoWeAre/NumberCard/utils/numberCardsExtraArguments";

type Props = WhoWeAreData["data"]["attributes"];

export default function WhatWeDo({
  title,
  mapCards,
  mapTitle,
  miraeTitle,
  workWithUs,
  numberCards,
  description,
  valueRemarks,
  cityBackground,
  objectiveCards,
  wavesBackground,
  graphBackground,
  miraeDescription,
  fundamentalValuesTitle,
  fundamentalValuesDescription,
}: Props) {
  const customPixelsBreakpoint = { mobile: 750, tablet: TABLET_BREAKPOINT };
  const screen = GetScreenType(customPixelsBreakpoint);

  const renderObjectivesCards = () => {
    if (screen === "mobile")
      return (
        <CardsCarousel
          className={`${styles["who-we-are__objectives-card-container"]}`}
          itemsLength={objectiveCards.length}
          customBreakpoint={{
            desktop: 2,
            tablet: 1,
            mobile: 1,
          }}
          customPixelsBreakpoint={customPixelsBreakpoint}
          orangeArrows
        >
          {objectiveCards.map((item, index) => (
            <ObjectivesCard key={index} {...item} />
          ))}
        </CardsCarousel>
      );

    return (
      <>
        {objectiveCards.map((item, index) => (
          <ObjectivesCard key={index} {...item} />
        ))}
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Mirae | Quem somos</title>
        <meta name="description" content="Mirae Asset" />
      </Head>
      <section>
        <div className={`container ${styles["who-we-are__header"]}`}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <FullWidthBackgroundContainer
          background={cityBackground}
          className={styles["who-we-are__background"]}
        />
        <div className={styles["who-we-are__number-cards-container"]}>
          {numberCards.map((card, index) => {
            const mobileBreakpointCondition =
              screen === "mobile" && index === 1;

            const numberCardProps = {
              ...card,
              ...numberCardsExtraArguments[index],
            };

            return (
              <>
                <NumberCard key={index} {...numberCardProps} />
                {mobileBreakpointCondition && (
                  <div className={styles["break"]} />
                )}
              </>
            );
          })}
        </div>
        <section className={`${styles["who-we-are__values-container"]}`}>
          <div className="container">
            <div
              className={styles["who-we-are__values-container__top-container"]}
            >
              <h2>{miraeTitle}</h2>
              <h2>{miraeDescription}</h2>
            </div>
            <div
              className={
                styles["who-we-are__values-container__content-container"]
              }
            >
              <div
                className={
                  styles["who-we-are__values-container__graph-container"]
                }
              >
                <StrapiImage
                  src={graphBackground.data.attributes.url}
                  className={styles["who-we-are__values-container__graph"]}
                />
              </div>
              {valueRemarks.map((item, index) => (
                <ValueRemark key={index} {...item} />
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles["who-we-are__fundamentals-container"]}`}>
          <StrapiImage
            className={`${styles["who-we-are__fundamentals-container__image-container"]}`}
            src={wavesBackground.data.attributes.url}
          />
          <div
            className={`${styles["who-we-are__fundamentals-container__text-container"]}`}
          >
            <h2>{fundamentalValuesTitle}</h2>
            <div />
            <p>{fundamentalValuesDescription}</p>
          </div>
        </section>
        <section className={`${styles["who-we-are__objectives-container"]}`}>
          {renderObjectivesCards()}
        </section>
        <section
          className={`${styles["who-we-are__global-expansion-outer-container"]}`}
        >
          <div
            className={`container ${styles["who-we-are__global-expansion-inner-container"]}`}
          >
            <h2>{mapTitle}</h2>
            <MapChart mapCards={mapCards} />
            <CardsCarousel
              itemsLength={mapCards.length}
              customBreakpoint={{
                desktop: 3,
                tablet: 2,
                mobile: 1,
              }}
              orangeArrows
              className={styles["who-we-are__card-container"]}
            >
              {mapCards.map((item, index) => (
                <MapCard key={index} {...item} />
              ))}
            </CardsCarousel>
          </div>
        </section>
        <section
          className={`container ${styles["who-we-are__footer-container"]}`}
        >
          <div>
            <h3>{workWithUs.title}</h3>
            <div />
            <p>{workWithUs.description}</p>
            <a href={`mailto:${workWithUs.contactEmail}`}>
              {workWithUs.contactEmail}
            </a>
          </div>
        </section>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const whoWeAreData = await fetchWhoWeAreData();

    return {
      props: {
        ...whoWeAreData?.data?.attributes,
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
