import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { StrapiImage } from '../interfaces';
import { StrapiLink } from "@/interfaces/StrapiLink";

export async function fetchRecommendedWalletPageData(): Promise<RecommendedWalletData> {
  try {
    const response = await api.get("/recommended-wallet-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface RecommendedWalletData {
  data: {
    id: number;
    attributes: {
      header: Header;
      title: string;
      description: string;
      titleCard1: string;
      titleCard2: string;
      titleCard3: string;
      card1: Array<Card>;
      card2: Array<Card>;
      card3: Array<Card>;
      footer: Footer;
    };
  };
}

export interface Card {
  id: number;
  title: string;
  date: string;
  description: string;
  graphicNumber1: string;
  graphicNumber2: string;
  graphicText1: string;
  graphicText2: string;
  titleAvatar: string;
  graphicIcon1: StrapiImage;
  graphicIcon2: StrapiImage;
  avatar1: StrapiImage;
  avatar2: StrapiImage;
  icon: StrapiImage;
  link: StrapiLink;
}
