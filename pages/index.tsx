import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { fetchHomeData, HomePageData } from "@/endpoints/fetchHomeData";
import { Link } from "@/components/Common/Link";
import { HomeAdvantages } from "@/components/Home/HomeAdvantages";
import { HomeNegotiationPlatforms } from "@/components/Home/HomeNegotiationPlatforms";
import { HomeInvestments } from "@/components/Home/HomeInvestments";
import { FullWidthBackgroundContainer } from "@/components/Common/FullWidthBackgroundContainer";
import { StrapiResponsiveImage } from "@/components/Common/StrapiResponsiveImage";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";

import styles from "../styles/Home.module.scss";

type HomePageProps = HomePageData["data"]["attributes"];

const Home: NextPage<HomePageProps> = ({
  bannerSimulador,
  banner1,
  banner3,
  investments,
  advantagesTitle,
  advantages,
  feesList,
  negotiationPlatforms,
  bannerSimuladorVisible,
}) => {
  return (
    <div className={styles["home-container"]}>
      <Head>
        <title>Mirae | Home</title>
        <meta
          name="description"
          content="Fundos Imobiliários Invista com taxa zero. Comece agora a investir em Previdência Privada."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FullWidthBackgroundContainer
          className={styles["home__banner"]}
          background={banner1.background}
          backgroundMobile={banner1.backgroundMobile}
          size="large"
          visible={banner1?.visible}
        >
          <div className={`container ${styles["home__top-container-content"]}`}>
            <h2>
              <ReactMarkdown>{banner1.title}</ReactMarkdown>
            </h2>
            <p>{banner1.description}</p>
            <Link
              variant="contained"
              href={banner1.link.Url}
              target={banner1.link.Target}
            >
              {banner1.link.Label}
            </Link>
          </div>
        </FullWidthBackgroundContainer>
        {!!bannerSimuladorVisible && (
          <section className={styles["home__investments-simulator"]}>
            <div className="container">
              <StrapiResponsiveImage
                img={bannerSimulador.image}
                alt={bannerSimulador.image.data.attributes.alternativeText}
              />
              <div className={styles["home__investments-simulator__texts"]}>
                <h2>{bannerSimulador.title}</h2>
                <span>{bannerSimulador.description}</span>
                <Link href={bannerSimulador.link.Url} variant="contained">
                  {bannerSimulador.link.Label}
                </Link>
              </div>
            </div>
          </section>
        )}
        <FullWidthBackgroundContainer
          className={styles["home__banner__market-analysis"]}
          background={banner3.background}
          backgroundMobile={banner3.backgroundMobile}
          visible={banner3?.visible}
          size="large"
        >
          <div className="container">
            <div className={styles["home__banner__content"]}>
              <h2>
                <ReactMarkdown>{banner3.title}</ReactMarkdown>
              </h2>
              <p>{banner3.description}</p>
              <Link variant="contained" href={banner3.link.Url} passHref>
                {banner3.link.Label}
              </Link>
            </div>
          </div>
        </FullWidthBackgroundContainer>
        <HomeInvestments investments={investments} />
        <section className={styles["home__advantages"]}>
          <div className={`container ${styles["home__advantages__container"]}`}>
            <HomeAdvantages title={advantagesTitle} advantages={advantages} />
          </div>
        </section>
        <FullWidthBackgroundContainer
          aria-labelledby="home-fees"
          id="home-fees"
          background={feesList?.image}
          className={styles["home-fees"]}
          size="large"
        >
          <div className={styles["price-taxes-outer-container"]}>
            <ul className={`container`}>
              {feesList?.fees?.map((fee) => (
                <div
                  key={fee.title}
                  className={styles["price-taxes-full-container"]}
                >
                  <li>
                    <div className={styles["price-taxes-container"]}>
                      <h3>{fee.title}</h3>
                      <div className={styles["price-taxes-bottom-container"]}>
                        <span>R$</span>
                        <b>{fee.amount}</b>
                        <strong>{fee.feeType}</strong>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <footer>
            <div className={styles["price-taxes-footer-description"]}>
              <p>
                {feesList?.details}
                <Link
                  className={styles["footer-link-highlight"]}
                  href={feesList?.link.Url}
                  target={feesList?.link.Target}
                >
                  {feesList?.link.Label}
                </Link>
              </p>
            </div>
          </footer>
        </FullWidthBackgroundContainer>
        <div className="container">
          <HomeNegotiationPlatforms
            negotiationPlatforms={negotiationPlatforms}
          />
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps(context: NextPageContext) {
  try {
    const homePageData = await fetchHomeData();

    return {
      props: homePageData.data.attributes,
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

export default Home;
