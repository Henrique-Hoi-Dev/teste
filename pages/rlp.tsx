import Head from "next/head";
import { fetchRLPPageData, RLPPageData } from "@/endpoints/fetchRLPPageData";
import { NextPageContext } from "next";
import { Banner } from "@/components/Banner";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { Table } from "@/components/Rlp/Table";
import { isMobile } from "@/utils/hooks/isMobile";

import ReactMarkdown from "react-markdown";

import styles from "@/styles/rlp.module.scss";

type Props = RLPPageData["data"]["attributes"];

export default function RLP({
  banner,
  title,
  description,
  description2,
  description3,
  subDescription3,
  table,
  title2,
  title3,
  titleContinuationRlp,
}: Props) {
  const mobile = isMobile();

  const titleContinuationRlps = mobile ? "" : titleContinuationRlp;

  return (
    <div>
      <Head>
        <title> RLP | Mirae Asset</title>
        <meta name="description" content="Página de Ofertas públicas" />
      </Head>
      <Banner
        classNameContent={styles["rlp-section__banner"]}
        {...banner}
        alternative={titleContinuationRlps}
      />

      <section className={styles["rlp-section__texts"]}>
        <div className={styles["rlp-section__texts__text"]}>
          <h1>{title}</h1>
          <div className={styles["rlp-section__texts__text-descrição"]}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
        <div className={styles["rlp-section__texts__text"]}>
          <h1>{title2}</h1>
          <div className={styles["rlp-section__texts__text-descrição"]}>
            <ReactMarkdown>{description2}</ReactMarkdown>
          </div>
        </div>
      </section>

      <Table
        title3={title3}
        description3={description3}
        subDescription3={subDescription3}
        table={table}
      />
    </div>
  );
}

export async function getStaticProps(context: NextPageContext) {
  try {
    const pageData = await fetchRLPPageData();

    return {
      props: pageData?.data?.attributes,
      revalidate: PAGE_REGENERATION_TIME,
    };
  } catch (err) {
    return {
      props: {
        error: true,
      },
    };
  }
}
