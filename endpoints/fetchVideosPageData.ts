import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { StrapiLink } from "@/interfaces/StrapiLink";
import { VideosCarousel } from "@/interfaces/VideoCarousel";
import { StrapiImage } from "../interfaces";

export async function fetchVideosPageData(): Promise<VideosPageData> {
  try {
    const response = await api.get("/educational-videos-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface VideosPageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      title: string;
      description: string;
      mirae_youtube_url: StrapiLink;
      videos: VideosCarousel;
      banner: Banner;
    };
  };
}

interface Banner {
  id: number;
  title: string;
  description: string;
  link: StrapiLink;
  banner_mobile: StrapiImage;
  banner_desktop: StrapiImage;
}
