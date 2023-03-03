import Head from "next/head";
import { useState } from "react";
import { GetStaticProps } from "next";
import {
  Response as BlogData,
  fetchBlogPageData,
} from "@/endpoints/blog/fetchBlogPageData";
import {
  FeaturedPosts,
  PostsCardsList,
  VerticalPostsList,
} from "@/components/Blog";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import ScrollContainer from "react-indiana-drag-scroll";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import { CardsCarousel } from "@/components/Common";
import styles from "@/styles/blog.module.scss";

type Props = BlogData["data"]["attributes"];

export default function BlogPost(props: Props) {
  const { featuredPosts, featuredPostsTitle, lastPosts, postsByCategory } =
    props;
  const screen = GetScreenType();

  const [currentItemTitle, setCurrentItemTitle] = useState<string>(
    (postsByCategory && postsByCategory[0]?.title) || ""
  );

  const onSlideChange = (index: number) => {
    setCurrentItemTitle(postsByCategory[index].title);
  };

  const renderMobileHeader = () => (
    <strong className={styles["blog-container__posts-categorys__title"]}>
      {currentItemTitle}
    </strong>
  );

  const renderPostsList = () => {
    return postsByCategory.map((post) => (
      <VerticalPostsList key={post.id} {...post} />
    ));
  };

  const renderPosts = () =>
    screen === "mobile" ? (
      <CardsCarousel
        customBreakpoint={{
          desktop: 1,
          tablet: 1,
          mobile: 1,
        }}
        itemsLength={2}
        arrowsPosition="top"
        arrowsContainerClassName={
          styles["blog-container__posts-categorys__carousel-arrows"]
        }
        header={renderMobileHeader()}
        onSlideChange={(index) => onSlideChange(index)}
      >
        {renderPostsList()}
      </CardsCarousel>
    ) : (
      <ScrollContainer> {renderPostsList()} </ScrollContainer>
    );

  return (
    <>
      <Head>
        <title> Mirae | Blog </title>
      </Head>
      <section className={styles["blog-container"]}>
        <FeaturedPosts
          featuredPosts={featuredPosts}
          featuredPostsTitle={featuredPostsTitle}
        />
        {lastPosts?.posts?.length > 0 && <PostsCardsList {...lastPosts} />}
        {postsByCategory?.length > 0 && (
          <section className={styles["blog-container__posts-categorys"]}>
            {renderPosts()}
          </section>
        )}
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (props) => {
  try {
    const pageData = await fetchBlogPageData();

    return {
      props: { ...pageData.data.attributes },
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
