import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import {
  fetchPrevidenciaPrivadaPageData,
  PrivatePrevidenciaData,
} from "@/endpoints/index";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import ReactMarkdown from "react-markdown";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { AlertOutline } from "@/icons/AlertOultine";
import { Chart } from "@/components/PrivatePension/Chart";
import {
  VideosSection,
  Banner,
  FrequentlyAskedQuestions,
  SmallBanner,
  CardWithBackground,
  Link,
} from "@/components/Common";
import styles from "@/styles/privatePension.module.scss";

type Props = PrivatePrevidenciaData["data"]["attributes"];

export default function PrivatePension(props: Props) {
  const {
    taxingLabel,
    description,
    frequentAskedQuestions,
    banner,
    graphData,
    cardsSection,
    bottomBanner,
    videos,
    bottomText,
    bottomTextLink,
  } = props;

  const customQuestionIndicator = () => (
    <AiOutlineQuestionCircle
      className={styles["private-pension-section__question-indicator"]}
    />
  );

  return (
    <>
      <Head>
        <title> Mirae | Previdência Privada</title>
        <meta name="description" content="Mirae Assets" />
      </Head>
      <section className={styles["private-pension-section"]}>
        <Banner
          {...banner}
          classNameContent={styles["private-pension-section__banner"]}
        />
        <div className="container">
          <ReactMarkdown
            className={styles["private-pension-section__description"]}
          >
            {description}
          </ReactMarkdown>
          <FrequentlyAskedQuestions
            title={frequentAskedQuestions.title}
            items={frequentAskedQuestions.contents}
            numberItem={false}
            statusItem={false}
            descriptionAsMarkdown={true}
            customItemIndicator={customQuestionIndicator()}
          />
          <h3 className={styles["private-pension-section__cards-title"]}>
            {cardsSection?.title.toUpperCase()}
          </h3>
          <div className={styles["private-pension-section__cards"]}>
            {cardsSection?.cards?.length &&
              cardsSection.cards.map((card) => (
                <CardWithBackground
                  key={card.id}
                  title={card.title}
                  description={card.description}
                />
              ))}
          </div>
          <Chart title={taxingLabel} graphData={graphData} />
          <div className={styles["private-pension-section__alert"]}>
            <div>
              <AlertOutline />
              <p>
                {bottomText}
                <Link href={bottomTextLink.Url} target={bottomTextLink.Target}>
                  {bottomTextLink.Label}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <VideosSection {...videos} />
        <SmallBanner banner={bottomBanner} bannerSize={"large"} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const pageData = await fetchPrevidenciaPrivadaPageData();

    return {
      props: {
        ...pageData?.data.attributes,
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
