import {
  fetchExchangePageData,
  ExchangePageData,
} from "@/endpoints/fetchExchangePageData";
import { NextPageContext } from "next";
import Head from "next/head";
import { Banner } from "@/components/Banner";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { GenericCarousel } from "@/components/Common/GenericCarousel";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { InfoCard } from "@/components/Common/InfoCard";
import { Filters } from "@/components/InvestmentFund/Filters";
import ReactMarkdown from "react-markdown";

import styles from "@/styles/cambio.module.scss";

type Props = ExchangePageData["data"]["attributes"];

export default function Exchange({
  cards,
  banner,
  deliveryFeeInfo,
  exchangeVantagesCarousel,
}: Props) {
  const renderCarouselItems = () =>
    exchangeVantagesCarousel.map((item, index) => (
      <li
        key={item.id}
        className={styles["exchange-container__advatanges-carousel__item"]}
      >
        <div>
          <h3>
            <strong> {index + 1}.</strong> {item.title}
          </h3>
          <ReactMarkdown>{item.description}</ReactMarkdown>
        </div>
        <div
          className={
            styles["exchange-container__advatanges-carousel__item-img"]
          }
        >
          <StrapiImage src={item.image.data.attributes.url} />
        </div>
      </li>
    ));

  return (
    <div>
      <Head>
        <title>Mirae | Câmbio</title>
        <meta name="description" content="Founder page" />
      </Head>
      <main className={styles["founder-section"]}>
        <Banner {...banner} classNameContent={styles["banner"]} />
        <section
          className={styles["exchange-container__advantagens-carousel-section"]}
        >
          <div className="container">
            <GenericCarousel heading="vantagens" leftAlignedDots>
              {renderCarouselItems()}
            </GenericCarousel>
          </div>
          <div className={styles["exchange-container__cards"]}>
            {cards.map((card, idx) => {
              return (
                <div
                  key={idx}
                  className={styles["exchange-container__inner-card"]}
                >
                  <InfoCard {...card} />{" "}
                </div>
              );
            })}
          </div>
          <div className={styles["delivery-info-container"]}>
            <p>{deliveryFeeInfo}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps(context: NextPageContext) {
  try {
    const pageData = await fetchExchangePageData();

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
