import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { fetchVideosPageData, VideosPageData } from "@/endpoints/index";
import { VideosCarousel } from "@/components/Common/VideosCarousel";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import styles from "../styles/Videos.module.scss";
import { isMobile } from "@/utils/hooks/isMobile";
import { Link } from "@/components/Common/Link";

type Props = VideosPageData["data"]["attributes"];

export default function Videos(props: Props) {
  const { title, description, mirae_youtube_url, videos, banner } = props;

  const mobile = isMobile();

  const backgroundImage = mobile
    ? banner?.banner_mobile.data.attributes.url
    : banner?.banner_desktop.data.attributes.url;

  return (
    <>
      <Head>
        <title> Mirae | Videos</title>
      </Head>

      <section>
        <div className="container">
          <h1>{title}</h1>
          <p className={styles["description-text"]}>{description}</p>
          <Link
            variant="contained"
            href={mirae_youtube_url.Url}
            target={mirae_youtube_url.Target}
          >
            {mirae_youtube_url.Label}
          </Link>
        </div>
        <div className={styles["educational-videos-container"]}>
          {videos.category.map((category) => (
            <VideosCarousel key={category?.id} {...category} />
          ))}
        </div>
      </section>
      <section
        className={styles["videos-section__informative_banner"]}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div
          className={`${styles["videos-section__informative_banner__content"]} full-width`}
        >
          <h3>{banner?.title}</h3>
          <span>{banner?.description}</span>
          <Link
            href={banner?.link.Url}
            variant="contained"
            target={banner?.link.Target}
          >
            {banner?.link.Label}
          </Link>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const videoPageData = await fetchVideosPageData();

    return {
      props: {
        ...videoPageData?.data.attributes,
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
