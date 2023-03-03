import Head from "next/head";
import {
  fetchIPOPageData,
  IpoDataAttributes,
} from "@/endpoints/fetchIPOPageData";
import { fetchIpoList, Ipo } from "@/endpoints/ipo/fetchIpoList";
import { NextPageContext } from "next";
import { Banner } from "@/components/Banner";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { Table } from "@/components/Ipo/Table";
import ReactMarkdown from "react-markdown";
import { CardVideo } from "@/components/Common/CardVideo";
import { SmallBanner } from "@/components/Common/SmallBanner";
import styles from "@/styles/ipo.module.scss";

interface Props extends IpoDataAttributes {
  openOffers: Array<Ipo>;
  closedOffers: Array<Ipo>;
}

export default function Costs({
  banner,
  informativeText,
  bottomBanner,
  videos,
  openOffers,
  closedOffers,
  ipoListing,
}: Props) {
  return (
    <div>
      <Head>
        <title> IPO | Mirae Asset</title>
        <meta name="description" content="IPO | Mirae Asset " />
      </Head>
      <section className={styles["ipo-section"]}>
        <Banner classNameContent={styles["ipo-section__banner"]} {...banner} />
        <div className={styles["ipo-section__content"]}>
          <ReactMarkdown>{informativeText}</ReactMarkdown>
          <Table
            closedOffers={closedOffers}
            openOffers={openOffers}
            {...ipoListing}
          />
        </div>
        {videos?.videoOfTheCards?.length > 0 && (
          <div className={styles["ipo-section__videos"]}>
            <div className="container">
              <CardVideo {...videos} />
            </div>
          </div>
        )}
        <SmallBanner banner={bottomBanner} />
      </section>
    </div>
  );
}

export async function getStaticProps(context: NextPageContext) {
  try {
    const pageData = await fetchIPOPageData();
    const ipolist = await fetchIpoList();

    return {
      props: {
        ...pageData?.data?.attributes,
        ...ipolist,
      },
      revalidate: PAGE_REGENERATION_TIME,
    };
  } catch (err) {
    return {
      props: {
        error: true,
        revalidate: PAGE_REGENERATION_TIME,
      },
    };
  }
}
