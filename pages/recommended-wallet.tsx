import React from "react";
import { GetStaticProps } from "next";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import {
  fetchRecommendedWalletPageData,
  RecommendedWalletData,
} from "../endpoints";
import { Card } from "@/components/RecommendedWallet/CardRow";

import Head from "next/head";
import styles from "@/styles/wallet.module.scss";

type Props = RecommendedWalletData["data"]["attributes"];

export default function RecommendedWallet(props: Props) {
  const {
    title,
    description,
    card1,
    titleCard1,
    card2,
    titleCard2,
    titleCard3,
    card3,
  } = props;

  return (
    <>
      <Head>
        <title> Mirae | Carteiras recomendadas</title>
      </Head>
      <section className={styles["wallet-section"]}>
        <div className={styles["wallet-section__title"]}>
          <div className={styles["wallet-section__title__content"]}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </section>

      <section className={styles["wallet-section__cards"]}>
        <div className="container">
          <Card title={titleCard1} cards={card1} />
          <Card title={titleCard2} cards={card2} />
          <Card title={titleCard3} cards={card3} />
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const recommendedWalletPageData = await fetchRecommendedWalletPageData();

    return {
      props: {
        ...recommendedWalletPageData.data.attributes,
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
