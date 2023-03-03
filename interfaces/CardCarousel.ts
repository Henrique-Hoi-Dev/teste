import { StrapiImage } from "@/interfaces/StrapiImage";

export interface CardCarousel {
  id: number;
  title: string;
  cards: Array<CardVideoCarousel>;
  isBeAnAdvisorCard?: boolean;
}

export interface CardVideoCarousel {
  id: number;
  title: string;
  description: string;
}
