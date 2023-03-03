import React from "react";
import { GetStaticProps } from "next";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import {
  TransferOfResourcesData,
  fetchTransferOfResourcesData,
} from "@/endpoints/index";
import { Banner } from "@/components/Banner";
import { FrequentlyAskedQuestions } from "@/components/Common/FrequentlyAskedQuestions";
import { ProductTypes } from "@/components/FixedIncome/ProductTypes";

import Head from "next/head";
import styles from "../styles/Transfer-of-resources.module.scss";

type Props = TransferOfResourcesData["data"]["attributes"];

export default function TransferOfResources(props: Props) {
  const { banner, info_itens, transfers_itens } = props;

  return (
    <>
      <Head>
        <title>Mirae | Transferência de recursos</title>
        <meta name="description" content="Mirae Asset" />
      </Head>

      <Banner {...banner} classNameContent={`${styles["banner"]}`} />

      <section className={styles["transfer-of-resources-section"]}>
        <div className="container">
          <FrequentlyAskedQuestions
            title={transfers_itens.title}
            items={transfers_itens.itens}
            numberItem={true}
            statusItem={false}
            limiter={7}
            descriptionAsMarkdown={true}
            className={styles["questions"]}
          />

          <ProductTypes data={info_itens} className={styles["info"]} />
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const transferOfResourcesData = await fetchTransferOfResourcesData();

    return {
      props: {
        ...transferOfResourcesData?.data?.attributes,
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
