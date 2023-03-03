import { Response as BlogData } from "@/endpoints/blog/fetchBlogPageData";
import { Card } from "@/components/Blog/FeaturedPosts/Card";
import styles from "./styles.module.scss";

type Props = BlogData["data"]["attributes"]["lastPosts"];

export function VerticalPostsList(props: Props) {
  const lastPosts = props;

  return (
    <div className={styles["vertical-post-list__container"]}>
      <span className={styles["vertical-post-list__container__title"]}>
        {lastPosts.title}
      </span>

      <ul className={`container ${styles["vertical-card-list"]}`}>
        {lastPosts.posts.map((post) => {
          const { id } = post;

          const { author, title, categorys, slug } =
            post?.blog_post?.data?.attributes;

          return (
            <Card
              background=""
              author={author}
              title={title}
              categorys={categorys}
              slug={slug}
              key={id}
              className={styles["vertical-card-list__card"]}
            />
          );
        })}
      </ul>
    </div>
  );
}
