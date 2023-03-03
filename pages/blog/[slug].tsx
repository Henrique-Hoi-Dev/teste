import Head from "next/head";
import { GetStaticProps } from "next";
import {
  fetchBlogPost,
  rateBlogPost,
  Response as BlogPostData,
} from "@/endpoints/blog";
import { PencilOutline, StarDashed, StarOutline } from "@/icons/index";
import {
  AiOutlineClockCircle,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from "react-icons/ai";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { extractMonthFromDate, extractDayFromDate } from "@/utils/date";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import Rating from "@mui/material/Rating";
import { GetCurrentUrl } from "@/utils/hooks/getCurrentUrl";
import {
  StrapiResponsiveImage,
  LinkedinShareButton,
  BreadCrumb,
} from "@/components/Common";
import ReactMarkdown from "react-markdown";
import styles from "@/styles/blog-post.module.scss";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";

type Props = BlogPostData["data"][0]["attributes"];

export default function BlogPost(props: Props) {
  const {
    title,
    author,
    date,
    subTitle,
    categorys,
    banner,
    blogSections,
    labelLikedThisPost,
    labelSharePost,
    postId = "",
  } = props;

  const screenType = GetScreenType();
  const currentUrl = GetCurrentUrl();

  const onRating = async (rating: number) => {
    try {
      await rateBlogPost({ postId, rating });
    } catch (err) {}
  };

  const renderPostAuthorAndCategorys = () => (
    <>
      <strong className={styles["blog-post-container__post-info__author"]}>
        <PencilOutline />
        {author}
      </strong>
      <ul className={styles["blog-post-container__post-info__categorys"]}>
        {categorys.map((category) => (
          <li key={category.id}> {category.category} </li>
        ))}
      </ul>
    </>
  );

  const renderSocialNetworksShareButtons = () => (
    <div className={styles["blog-post-container__share-post"]}>
      <FacebookShareButton url={currentUrl} quote={title}>
        <FiFacebook />
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl}>
        <FiTwitter />
      </TwitterShareButton>
      <LinkedinShareButton url={currentUrl} />
      <EmailShareButton url={currentUrl}>
        <AiOutlineMail />
      </EmailShareButton>
      <WhatsappShareButton url={currentUrl}>
        <AiOutlineWhatsApp />
      </WhatsappShareButton>
    </div>
  );

  return (
    <>
      <Head>
        <title> Blog | {title} </title>
      </Head>
      <BreadCrumb
        previousRoute={{
          label: "Blog",
          href: "/blog",
        }}
        currentRouteTitle={title}
      />
      <div className={`${styles["blog-post-container"]}  container`}>
        <section className={styles["blog-post-container__title"]}>
          <h1>{title}</h1>
          <p>{subTitle}</p>

          <div className={styles["blog-post-container__post-info"]}>
            <strong
              className={`${styles["blog-post-container__post-info__author"]} hidden-until-tablet `}
            >
              <PencilOutline />
              {author}
            </strong>

            <ul
              className={`${styles["blog-post-container__post-info__categorys"]} hidden-until-tablet`}
            >
              {categorys.map((category) => (
                <li key={category.id}> {category.category} </li>
              ))}
            </ul>

            <div className="tablet-visible">
              {renderPostAuthorAndCategorys()}
            </div>

            <strong className={styles["blog-post-container__post-info__date"]}>
              <AiOutlineClockCircle /> Criado em {extractDayFromDate(date)} de{" "}
              {extractMonthFromDate(date)}
            </strong>
          </div>
        </section>

        {banner?.data?.attributes && (
          <StrapiResponsiveImage img={banner} size="large" />
        )}

        <div className={styles["blog-post-container__text-content"]}>
          <section>
            {blogSections.map((section) => (
              <section key={section.id}>
                {section?.title && (
                  <div
                    className={
                      styles["blog-post-container__text-content__title"]
                    }
                  >
                    <h2> {section.title} </h2>
                    <div
                      className={
                        styles["blog-post-container__text-content__divider"]
                      }
                    ></div>
                  </div>
                )}

                <ReactMarkdown>{section.content}</ReactMarkdown>
              </section>
            ))}
          </section>

          <aside>
            <h3>{title}</h3>

            <p>
              <span>
                <h3> {labelLikedThisPost} </h3>

                {labelSharePost}
              </span>

              {screenType === "tablet" && renderSocialNetworksShareButtons()}
            </p>
            {screenType !== "tablet" && renderSocialNetworksShareButtons()}
          </aside>
        </div>
        <div className={styles["blog-post-container__stars"]}>
          <strong>Esse artigo foi útil?</strong>
          <Rating
            defaultValue={0}
            icon={<StarOutline />}
            emptyIcon={<StarDashed />}
            onChange={(event, newValue) => onRating(newValue)}
          />
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (props) => {
  try {
    const { slug = "" } = props.params;

    const post = await fetchBlogPost({ slug });

    return {
      props: { ...post.data[0].attributes, postId: post.data[0].id },
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
