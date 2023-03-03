import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  fetchNonResidentInvestorData,
  NonResidentInvestorData,
} from "@/endpoints/index";
import { InfoCardNumber } from "@/components/NonResidentInvestor/InfoCard";
import { Card } from "@/components/NonResidentInvestor/Card";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { Banner } from "@/components/Banner";
import { isMobile } from "@/utils/hooks/isMobile";
import { FullWidthBackgroundContainer } from "@/components/Common/FullWidthBackgroundContainer";
import { Link } from "@/components/Common/Link";

import styles from "@/styles/nonResidentInvestor.module.scss";

type Props = NonResidentInvestorData["data"]["attributes"];

export default function NonResidentInvestor(props: Props) {
  const {
    banner,
    cardInfo,
    cardNumber,
    titleCard,
    cards,
    description2,
    titleEmail,
    titleNRI,
    titlePhone,
    graphicImage,
    graphicImageMobile,
    graphicTitle,
  } = props;

  const mobile = isMobile();

  const backgroundImage = mobile
    ? graphicImageMobile.data.attributes.url
    : graphicImage.data.attributes.url;

  return (
    <>
      <Head>
        <title>Mirae | Investidor não-residente</title>
        <meta name="description" content="Mirae Assets" />
      </Head>

      <Banner {...banner} classNameContent={`${styles["banner"]}`} />

      <div className="container">
        <section className={styles["resident-section"]}>
          <p className={styles["resident-section__description"]}>
            {description2}
          </p>
          <div className={styles["resident-section__card-content"]}>
            <h5>{titleCard.toUpperCase()}</h5>
            <div className={styles["resident-section__card-content__cards"]}>
              {cards.map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  icon={item.icon.data.attributes.url}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className={styles["resident-section__number-info"]}>
        <div className="container">
          <InfoCardNumber
            title={cardNumber.title}
            sing={cardNumber.cipher}
            number={cardNumber.numberValor}
            infoNumber={cardNumber.billion}
          />
        </div>
      </section>
      <div className="container">
        <div className={styles["resident-section__graphic"]}>
          <h2>{graphicTitle} </h2>
          <StrapiImage src={backgroundImage} alt="Gráfico INR" />
        </div>
      </div>

      <FullWidthBackgroundContainer
        background={cardInfo.background}
        backgroundMobile={cardInfo.backgroundMobile}
        className={`${styles["card-info"]}`}
      >
        <div className={styles["card-info__content"]}>
          <h1>{cardInfo.title}</h1>
          <p>{cardInfo.description}</p>
          <Link
            href={cardInfo.link.Url}
            target={cardInfo.link.Target}
            variant="contained"
          >
            {cardInfo.link.Label}
          </Link>
        </div>
      </FullWidthBackgroundContainer>

      <div className="container">
        <section className={styles["resident-section__card"]}>
          <div className={styles["resident-section__card__nri"]}>
            <h1>{titleNRI}</h1>
            <p>{titlePhone}</p>
            <span>{titleEmail}</span>
          </div>
        </section>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { locale = "en" } = context.query;

    const nonResidentInvestorData = await fetchNonResidentInvestorData({
      locale: String(locale),
    });

    return {
      props: {
        ...nonResidentInvestorData.data.attributes,
      },
    };
  } catch (err) {
    return {
      props: {
        error: true,
      },
    };
  }
};
