import React, { useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { fetchVariablePageData, VariablePageData } from "@/endpoints/index";
import { ProductTypes } from "@/components/Common/ProductTypes";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { Card } from "@/components/VariableIncome/Card";
import { ProductsTypes } from "@/interfaces/ProductsTypes";
import { CardCarousel } from "@/components/Common/CardCarousel";
import { CardVideo } from "@/components/Common/CardVideo";

import styles from "@/styles/variable.module.scss";
import { Banner } from "@/components/Banner";

type Props = VariablePageData["data"]["attributes"];

export default function VariableIncome(props: Props) {
  const {
    title,
    description,
    background,
    link,
    card1,
    card2,
    product_types,
    cardVideo,
  } = props;

  const [activeMenu, setActiveMenu] = useState<ProductsTypes>(product_types[0]);

  const onMenuChange = (products: ProductsTypes) => {
    setActiveMenu(products);
  };

  return (
    <>
      <Head>
        <title> Mirae | Renda variável</title>
      </Head>
      <Banner
        id={1}
        link={link}
        title={title}
        image={background}
        description={description}
      />
      <section className={styles["variable-section__cards-section"]}>
        <div className="container">
          <div className={styles["button-section"]}>
            {product_types.map((item) => (
              <button
                className={`${styles["button-container"]} ${
                  activeMenu.id === item.id && styles["highlighted-button"]
                }`}
                onClick={() => onMenuChange(item)}
                key={item?.id}
              >
                {item?.type}
              </button>
            ))}
          </div>
          <ProductTypes activeMenu={activeMenu} />
        </div>
      </section>
      <section className={styles["variable-section__card-content"]}>
        <div className="container">
          <div className={styles["variable-section__card-content__cards"]}>
            <Card
              title={card1?.title}
              description={card1?.description}
              link={card1?.link}
              icon={card1?.icon?.data?.attributes?.url}
              alt={card1?.icon?.data?.attributes?.name}
              noBorderRadius
            />
            <Card
              title={card2?.title}
              description={card2?.description}
              link={card2?.link}
              icon={card2?.icon?.data?.attributes?.url}
              alt={card1?.icon?.data?.attributes?.name}
              noBorderRadius
            />
          </div>
        </div>
      </section>
      {activeMenu && activeMenu.type === "BM&F" && (
        <div className="container">
          <section className={styles["variable-section__text-content"]}>
            <li
              className={
                styles["variable-section__text-content__card-container"]
              }
            >
              <h1>{activeMenu?.textsBmf?.title}</h1>
              <p>{activeMenu?.textsBmf?.description}</p>
              <p
                className={
                  styles["variable-section__text-content__description2"]
                }
              >
                {activeMenu?.textsBmf?.description2}
              </p>
            </li>

            <div className={styles["variable-section__text-content__cards"]}>
              <CardCarousel
                id={activeMenu?.id}
                title={activeMenu?.titleCarousel.toUpperCase()}
                cards={activeMenu?.cardType}
                isBeAnAdvisorCard
              />
            </div>
          </section>
        </div>
      )}
      {cardVideo?.title ? (
        <section className={styles["variable-section__card-video"]}>
          <div className="container">
            <CardVideo
              title={cardVideo?.title}
              videoOfTheCards={cardVideo?.videoOfTheCards}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const variablePageAccountData = await fetchVariablePageData();

    return {
      props: {
        ...variablePageAccountData?.data?.attributes,
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
