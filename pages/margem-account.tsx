import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import {
  fetchMargemAccountPageData,
  MargemAccountData,
} from "@/endpoints/index";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { FrequentlyAskedQuestions } from "@/components/Common/FrequentlyAskedQuestions";
import { Banner } from "@/components/Banner";

import styles from "../styles/marge-account.module.scss";

type Props = MargemAccountData["data"]["attributes"];

export default function MargemAccount(props: Props) {
  const { description, frequent_question, banner, bannerFooter } = props;

  return (
    <>
      <Head>
        <title> Mirae | Conta Margem</title>
      </Head>
      <Banner
        {...banner}
        classNameContent={styles["margem-account-section__banner"]}
      />

      <section className={styles["margem-account-section"]}>
        <div className="container">
          <p className={styles["margem-account-section__description"]}>
            {description}
          </p>
          <FrequentlyAskedQuestions
            title={frequent_question.title}
            items={frequent_question.contents}
            numberItem={true}
            statusItem={false}
            classNameContent={styles["margem-account-section__questions"]}
          />
        </div>
      </section>

      <Banner
        {...bannerFooter}
        className={styles["margem-account-section__banner-footer"]}
        classNameContent={styles["margem-account-section__content"]}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const margemAccountPageData = await fetchMargemAccountPageData();

    return {
      props: {
        ...margemAccountPageData?.data.attributes,
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
