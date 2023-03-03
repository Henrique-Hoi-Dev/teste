import { useState } from "react";
import {
  fetchCostsPageData,
  CostsPageData,
} from "@/endpoints/fetchCostsPageData";
import { NextPageContext } from "next";
import Head from "next/head";
import { Banner } from "@/components/Banner";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import styles from "@/styles/costs.module.scss";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { CardsCarousel } from "@/components/Common/CardsCarousel";
import ReactMarkdown from "react-markdown";
import { DocumentsAccordionItem } from "@/components/Common/DocumentsAccordion/DocumentsAccordionItem";
import Box from "@/components/Common/Box";
import { SearchInput } from "@/components/Common/SearchInput";

type Props = CostsPageData["data"]["attributes"];

export default function Costs({
  banner,
  cards,
  additionalCosts,
  taxas_section,
  documents,
  documentsTitle,
  searchInputPlaceholder,
  cards_title,
  additionalCostsTitle,
}: Props) {
  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  function filterReports(value: string) {
    const filteredList = documents.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredDocuments(filteredList);
  }

  return (
    <div>
      <Head>
        <title>Mirae | Custos</title>
        <meta name="description" content="Página de custos" />
      </Head>
      <section className={styles["costs-section"]}>
        <Banner className={styles["costs-section__banner"]} {...banner} />
        <div className={styles["costs-section__cards-section"]}>
          <div className="container">
            <strong>{cards_title}</strong>
            <CardsCarousel
              itemsLength={cards.length}
              className={styles["costs-section__cards-section__container"]}
            >
              {cards.map((card) => (
                <div key={card.id} className={styles["costs-section__card"]}>
                  <header>
                    <StrapiImage
                      src={card.icon.data.attributes.url}
                      alt={card.icon.data.attributes.alternativeText}
                    />
                    <strong>
                      {card.title}
                      <div />
                    </strong>
                  </header>
                  <p>{card.description}</p>
                </div>
              ))}
            </CardsCarousel>
          </div>
        </div>
        <section className={styles["costs-section__taxas"]}>
          <h2>
            {taxas_section.title} <div />
          </h2>
          <div className={styles["costs-section__taxas-info"]}>
            {/* <div>
              <b>R$ </b> <strong>{taxas_section.valueTaixa} </strong>{" "}
              <span>{taxas_section.labelTaixa}</span>
            </div> */}
            <div className={styles["costs-section__taxas-info__description"]}>
              <div>
                <ReactMarkdown>{taxas_section.description}</ReactMarkdown>
              </div>
              <div>
                <ReactMarkdown>{taxas_section.description2}</ReactMarkdown>
              </div>
            </div>
          </div>
          <Box className={styles["costs-section__additional-costs-box"]}>
            <h3>{additionalCostsTitle}</h3>
            <ul>
              {additionalCosts.map((item) => (
                <li
                  key={item.id}
                  className={
                    styles[
                      "costs-section__additional-costs-box__inner-container"
                    ]
                  }
                >
                  <h3>{item.title}</h3>
                  <ReactMarkdown>{item.description}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </Box>
        </section>
        <div className="container">
          <Box className={styles["costs-section__documents"]}>
            <h3> {documentsTitle.toUpperCase()} </h3>
            <SearchInput
              placeholder={searchInputPlaceholder}
              onChange={(ev) => filterReports(ev.target.value)}
            />
            <ul>
              {filteredDocuments.map((report) => (
                <DocumentsAccordionItem
                  key={report.id}
                  title={report.title}
                  media={report.media}
                />
              ))}
            </ul>
          </Box>
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps(context: NextPageContext) {
  try {
    const pageData = await fetchCostsPageData();

    return {
      props: pageData?.data.attributes,
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
