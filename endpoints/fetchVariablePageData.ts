import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { StrapiLink } from "@/interfaces/StrapiLink";
import { ProductsTypes } from "@/interfaces/ProductsTypes";
import { CardVideo } from "@/interfaces/CardVideo";

export async function fetchVariablePageData(): Promise<VariablePageData> {
  try {
    const { data } = await api.get("/bovespa-page?populate=deep");
    return data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface VariablePageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      title: string;
      description: string;
      background: StrapiImage;
      card1: Card;
      card2: Card;
      link: StrapiLink;
      product_types: Array<ProductsTypes>;
      cardVideo: CardVideo;
    };
  };
}

interface Card {
  title: string;
  description: string;
  icon: StrapiImage;
  link: StrapiLink;
}
