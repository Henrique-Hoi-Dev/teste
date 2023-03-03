import { StrapiImage } from "./StrapiImage";

export interface CardVideo {
  title: string;
  videoOfTheCards: Array<Videos>;
}

export interface Videos {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  labelButtonWatch: string;
  youtube_url: string;
  thumbnail: StrapiImage;
}