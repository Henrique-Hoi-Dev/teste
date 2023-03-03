import { Response as BlogData } from "@/endpoints/blog/fetchBlogPageData";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { createStrapiImageUrl } from "@/utils/createStrapiImageUrl";
import { Card } from "./Card";
import styles from "./styles.module.scss";

type FeaturedPosts = BlogData["data"]["attributes"]["featuredPosts"];

interface Props {
  featuredPostsTitle: string;
  featuredPosts: FeaturedPosts;
}

export function FeaturedPosts(props: Props) {
  const { featuredPostsTitle, featuredPosts } = props;

  const generateImageBackgroundUrl = (image: StrapiImage) => {
    return `url(${createStrapiImageUrl(image?.data?.attributes?.url)})`;
  };

  return (
    <div className={styles["featured-posts"]}>
      <div className="container">
        <h1> {featuredPostsTitle} </h1>

        <ul className={`${styles["featured-posts__list"]}`}>
          {featuredPosts.map((post, index) => {
            const { image, id, author, title, categorys, redirect_link } = post;

            const background =
              index === 0 ? generateImageBackgroundUrl(image) : "";

            return (
              <Card
                className={styles["featured-posts__post"]}
                key={id}
                title={title}
                author={author}
                background={background}
                categorys={categorys}
                slug={redirect_link}
                customRoute={true}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
