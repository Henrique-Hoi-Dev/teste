import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { PostAttributes } from "./fetchBlogPost";

export interface Response {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      featuredPostsTitle: string;
      featuredPosts: Array<FeaturedPost>;
      lastPosts: LastPosts;
      postsByCategory: Array<LastPosts>;
    };
  };
}
interface FeaturedPost {
  id: number;
  title: string;
  image: StrapiImage;
  author: string;
  categorys: Array<{
    id: number;
    category: string;
  }>;
  redirect_link: string;
}

interface LastPosts {
  id: number;
  title: string;
  posts: Array<Post>;
}

interface Post {
  id: number;
  image: StrapiImage;
  blog_post: {
    data: {
      attributes: PostAttributes;
    };
  };
}

export async function fetchBlogPageData(): Promise<Response> {
  try {
    const response = await api.get("/blog", {
      params: {
        populate: "deep",
      },
    });

    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}
