import {
  fetchFounderData,
  FounderPageData,
} from "@/endpoints/fetchFounderData";
import { NextPageContext } from "next";
import Head from "next/head";
import { FounderAchievements } from "@/components/Founder/FounderAchievements";
import { Accordion } from "@/components/Common/Accordion";
import { Carousel } from "@/components/Common/Carousel";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import styles from "@/styles/founder.module.scss";
import { Banner } from "@/components/Banner";

type Props = FounderPageData["data"]["attributes"];

export default function Founder({
  title,
  description,
  banner,
  achievements,
  speech,
  principlesHeading,
  principles,
}: Props) {
  return (
    <div>
      <Head>
        <title>Mirae | Fundador</title>
        <meta name="description" content="Founder page" />
      </Head>
      <main className={styles["founder-section"]}>
        <Banner
          id={1}
          image={banner}
          title={title}
          description={description}
          isFounderPage
        />
        <div className={styles["achievements-discourse-container"]}>
          <FounderAchievements achievements={achievements} />
        </div>
        <div className={styles["discourse-principles-outer-container"]}>
          <div className={styles["achievements-discourse-container"]}>
            <Accordion
              title={speech?.title}
              description={speech?.description}
            />
            <Carousel
              heading={principlesHeading}
              items={principles}
              isFounderPage
              className={styles["achievements-discourse-container__carousel"]}
              classNameContent={
                styles["achievements-discourse-container__carousel2"]
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context: NextPageContext) {
  try {
    const founderPageData = await fetchFounderData();

    return {
      props: founderPageData?.data.attributes,
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
