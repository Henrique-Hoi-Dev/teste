import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { StrapiImage } from "@/interfaces/StrapiImage";

interface fetchBlogPostParams {
  slug: string;
}

export interface Response {
  data: Array<{
    id: number;
    attributes: PostAttributes;
  }>;
}

export interface PostAttributes {
  header: Header;
  slug: string;
  title: string;
  subTitle: string;
  author: string;
  date: string;
  labelLikedThisPost: string;
  labelSharePost: string;
  banner: StrapiImage;
  categorys: Array<Category>;
  blogSections: Array<BlogSection>;
  footer: Footer;
}

interface Category {
  id: number;
  category: string;
}

interface BlogSection {
  id: number;
  title?: string;
  content: string;
}

export async function fetchBlogPost({
  slug,
}: fetchBlogPostParams): Promise<Response> {
  try {
    const response = await api.get("/blog-posts", {
      params: {
        "filters[slug][$eq]": slug,
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
