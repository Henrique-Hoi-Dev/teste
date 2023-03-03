import { StrapiResponsiveImage } from "@/components/Common";
import { Response as BlogData } from "@/endpoints/blog/fetchBlogPageData";
import ScrollContainer from "react-indiana-drag-scroll";
import { useRouter } from "next/router";
import { Author } from "../Author";
import { Categorys } from "../Categorys";
import styles from "./styles.module.scss";

type Props = BlogData["data"]["attributes"]["lastPosts"];

export function PostsCardsList(props: Props) {
  const lastPosts = props;
  const router = useRouter();

  return (
    <div className={styles["posts-card-list__container"]}>
      <div className="container">
        <h2> {lastPosts.title} </h2>
        <div className="divider" />
      </div>

      <ScrollContainer
        className={`${styles["posts-card-list"]}`}
        horizontal={true}
      >
        {lastPosts.posts.map((post) => {
          const { image } = post;

          const { author, title, categorys, slug } =
            post?.blog_post?.data?.attributes;

          return (
            <>
              <li
                key={post.id}
                className={styles["posts-card-list__card"]}
                role="button"
                onClick={() => router.push(`/blog/${slug}`)}
              >
                <StrapiResponsiveImage img={image} />
                <strong>
                  <span> {title} </span>
                </strong>
                <div className={styles["posts-card-list__info"]}>
                  <Author author={author} />
                  <Categorys categorys={categorys} />
                </div>
              </li>
            </>
          );
        })}
      </ScrollContainer>
    </div>
  );
}
