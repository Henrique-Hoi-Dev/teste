import React, { useState } from "react";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { PlatformsList } from "@/components/Platforms/PlatformsList";
import { InfoCard } from "@/components/Common/InfoCard";
import { Modal } from "@/components/Common/Modal";
import {
  fetchTradingPlatforms,
  TradingPlatforms,
  fetchPlatformsPageData,
  PlaformsPageData,
} from "@/endpoints/index";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import styles from "../styles/Platforms.module.scss";

type PlatformsPageDataProps = PlaformsPageData["data"]["attributes"];
interface Props {
  tradingPlatforms: TradingPlatforms;
  platformsPageData: PlatformsPageDataProps;
}

export default function Platforms(props: Props) {
  const { platformsPageData, tradingPlatforms } = props;

  const [isPlatformsInfoModalOpen, setIsPlatformsInfoModalOpen] =
    useState(false);

  const togglePlatformsInfoModal = () => {
    setIsPlatformsInfoModalOpen(!isPlatformsInfoModalOpen);
  };

  return (
    <>
      <Head>
        <title>Mirae | Plataformas</title>
        <meta name="description" content="Mirae Assets" />
      </Head>

      <section className="container">
        <h1 className={styles["platforms-section__title"]}>
          {platformsPageData?.title}
        </h1>
        <p className={styles["platforms-section__description"]}>
          {platformsPageData?.description}
        </p>
      </section>

      <section className={styles["platforms-section__list"]}>
        <div className="container">
          <PlatformsList {...tradingPlatforms} />
        </div>
      </section>

      <section className="container">
        <div className={styles["platforms-section__info-cards-container"]}>
          <InfoCard
            title={platformsPageData?.contactCard1.title}
            phoneNumber={platformsPageData?.contactCard1.phoneNumber}
            email={platformsPageData?.contactCard1.email}
            infoMessage={platformsPageData?.contactCard1.info_message}
            className={styles["platforms-section__info-cards-container__card"]}
          />
          <InfoCard
            title={platformsPageData?.contactCard2.title}
            phoneNumber={platformsPageData?.contactCard2.phoneNumber}
            email={platformsPageData?.contactCard2.email}
            infoMessage={platformsPageData?.contactCard2.info_message}
            className={styles["platforms-section__info-cards-container__card"]}
          />
        </div>
        <section className={styles["platforms-section__info-texts"]}>
          <ReactMarkdown
            components={{
              strong: (props) => (
                <strong
                  onClick={togglePlatformsInfoModal}
                  role="button"
                  {...props}
                />
              ),
            }}
          >
            {platformsPageData?.info_texts}
          </ReactMarkdown>
        </section>
        <Modal
          label="platforms-info-modal"
          onClose={togglePlatformsInfoModal}
          isOpen={isPlatformsInfoModalOpen}
          title={platformsPageData?.modal.title}
          bottomCloseButtonLabel={
            platformsPageData?.modal.bottom_close_button_label
          }
        >
          <section className={styles["platforms-section__modal-content"]}>
            <ReactMarkdown>
              {platformsPageData?.modal.modal_content}
            </ReactMarkdown>
          </section>
        </Modal>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const [tradingPlaformsData, platformsPageData] = await Promise.all([
      fetchTradingPlatforms(),
      fetchPlatformsPageData(),
    ]);

    return {
      props: {
        tradingPlatforms: tradingPlaformsData,
        platformsPageData: platformsPageData?.data.attributes,
        header: platformsPageData?.data.attributes.header,
        footer: platformsPageData?.data.attributes.footer,
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
