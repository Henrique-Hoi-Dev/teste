import { Footer } from "@/interfaces/Footer";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { api } from "@/services/api";
import { Header } from "../interfaces";

export async function fetchWhatWeDoData(): Promise<WhatWeDoData> {
  try {
    const response = await api.get("/what-we-do?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface WhatWeDoData {
  data: {
    id: number;
    attributes: {
      header: Header;
      banner: SimpleBanner;
      description: string;
      cards: Array<Card>;
      titleCardText: string;
      cardText: Array<CardText>;
      footer: Footer;
    };
  };
}

interface Card {
  title: string;
  description: string;
  image: StrapiImage;
}

interface CardText {
  id: number;
  title: string;
  description: string;
}
