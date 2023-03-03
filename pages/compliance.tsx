import React, { useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { fetchCompilancePageData, CompilancePageData } from "@/endpoints/index";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { DocumentsAccordion } from "@/components/Common/DocumentsAccordion";
import styles from "@/styles/compliance.module.scss";
import { SearchInput } from "@/components/Common/SearchInput";
import { Banner } from "@/components/Banner";
import ScrollToTop from "@/components/ScrollToTop";

type Props = CompilancePageData["data"]["attributes"];

export default function Compilance(props: Props) {
  const {
    title,
    description,
    link,
    banner,
    reportsCategory,
    searchInputPlaceholder,
    reportsBoxTitle
  } = props;

  const [filteredReports, setFilteredReports] = useState(reportsCategory);

  const renderReportsCategory = () => (
    <div className={styles["compilance-container__reports"]}>
      <div className={styles["compilance-container__reports__header"]}>
        <strong>{reportsBoxTitle}</strong>
        <SearchInput onChange={onSearch} placeholder={searchInputPlaceholder} />
      </div>
      {filteredReports.map((report, index) => (
        <DocumentsAccordion
          key={report?.id}
          title={report?.title}
          reports={report?.reports}
          index={index + 1}
        />
      ))}
    </div>
  );

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredReports(filterReportsCategorys(event?.target.value));
  };

  const filterReportsCategorys = (searchTerm: string) => {
    return reportsCategory.filter((report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <>
      <Head>
        <title> Mirae | Compliance</title>
      </Head>
      <section className={`${styles["compilance-container"]}`}>
        <Banner
          id={1}
          image={banner}
          title={title}
          description={description}
          link={link}
          classNameContent={styles["banner"]}
        />
        <div className={styles["compilance-container__background"]}>
          {renderReportsCategory()}
        </div>
        <ScrollToTop />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const compilancePageData = await fetchCompilancePageData();

    return {
      props: {
        ...compilancePageData?.data.attributes
      },
      revalidate: PAGE_REGENERATION_TIME
    };
  } catch (err) {
    return {
      props: {
        error: true
      }
    };
  }
};
