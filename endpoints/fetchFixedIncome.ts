import { api } from "../services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { StrapiLink } from "@/interfaces/StrapiLink";
import { StrapiImage } from "../interfaces";
import { CardVideo } from "@/interfaces/CardVideo";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";

export async function fetchFixedIncome(): Promise<FixedIncomeData> {
  try {
    const response = await api.get("/fixed-income?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface FixedIncomeData {
  data: {
    id: number;
    attributes: {
      header: Header;
      banner: SimpleBanner;
      description2: string;
      backgroundInfo_mobile: StrapiImage;
      backgroundInfo: StrapiImage;
      product_types: ProductTypesData;
      cardVideo: CardVideo;
      cardInfoText: CardInfoText;
      footer: Footer;
    };
  };
}

export interface ProductTypesData {
  id: number;
  title: string;
  items: Array<Items>;
}

interface Items {
  id: number;
  title: string;
  subTitle?: string;
  description: string;
  subDescription?: string;
}

interface CardInfoText {
  title: string;
  description: string;
  link: StrapiLink;
}
