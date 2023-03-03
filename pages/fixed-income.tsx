import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { fetchFixedIncome, FixedIncomeData } from "@/endpoints/index";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { CardVideo } from "@/components/Common/CardVideo";
import { ProductTypes } from "@/components/FixedIncome/ProductTypes";
import { Banner } from "@/components/Banner";

import styles from "@/styles/fixed-income.module.scss";

type Props = FixedIncomeData["data"]["attributes"];

export default function FixedIncome(props: Props) {
  const { banner, description2, cardVideo, product_types } = props;

  return (
    <section className={styles["fixed-income-outer-container"]}>
      <Head>
        <title> Mirae | Renda fixa</title>
        <meta name="description" content="Mirae Assets" />
      </Head>
      <Banner {...banner} />

      <section className={styles["fixed-income-section__text-content"]}>
        <div className="container">
          <li
            className={
              styles["fixed-income-section__text-content__card-container"]
            }
          >
            <p>{description2}</p>
          </li>

          <div className={styles["fixed-income-section__text-content__cards"]}>
            <ProductTypes data={product_types} />
          </div>
        </div>
      </section>
      {cardVideo?.title ? (
        <section className={styles["fixed-income-section__card-video"]}>
          <div className="container">
            <CardVideo
              title={cardVideo?.title}
              videoOfTheCards={cardVideo?.videoOfTheCards}
            />
          </div>
        </section>
      ) : null}

      {/* <section className={styles["fixed-income-section"]}>
        <div
          className={styles["fixed-income-section__text-info"]}
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), 
            radial-gradient(50% 50% at 50% 50%, rgba(34, 34, 34, 0.58) 0%, rgba(34, 34, 34, 0.71) 100%), 
            url(${backgroundImageInfo})`,
          }}
        >
          <div className={styles["fixed-income-section__text-info__content"]}>
            <h1>{cardInfoText?.title}</h1>
            <p>{cardInfoText?.description}</p>
            <Link
              variant="contained"
              href={cardInfoText?.link?.Url}
              target={cardInfoText?.link?.Target}
            >
              {cardInfoText?.link?.Label}
            </Link>
          </div>
        </div>
      </section> */}
    </section>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const fixedIncomeData = await fetchFixedIncome();

    return {
      props: {
        ...fixedIncomeData?.data?.attributes,
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
