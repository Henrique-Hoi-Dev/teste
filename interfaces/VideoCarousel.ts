import { StrapiImage } from "@/interfaces/StrapiImage";

export interface VideosCarousel {
  id: number;
  category: Array<VideosCategory>;
}

export interface VideosCategory {
  id: number;
  title: string;
  description: string;
  videos: Array<Video>;
}

export interface Video {
  id: number;
  title: string;
  youtube_url: string;
  thumbnail: StrapiImage;
}
