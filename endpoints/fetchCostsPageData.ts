import { api } from "@/services/api";
import { Footer } from "@/interfaces/Footer";
import { Header } from "@/interfaces/Header";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { StrapiImage } from "../interfaces";
import { StrapiFile } from "@/interfaces/StrapiFile";

export async function fetchCostsPageData(): Promise<CostsPageData> {
  try {
    const response = await api.get("/costs-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface CostsPageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      banner: SimpleBanner;
      cards_title: string;
      cards: Array<Card>;
      additionalCostsTitle: string;
      additionalCosts: Array<{
        id: number;
        title: string;
        description: string;
      }>;
      taxas_section: {
        title: string;
        labelTaixa: string;
        valueTaixa: string;
        description: string;
        description2: string;
      };
      documentsTitle: string;
      searchInputPlaceholder: string;
      documents: Array<{
        id: number;
        title: string;
        media: StrapiFile;
      }>;
    };
  };
}

interface Card {
  id: number;
  icon: StrapiImage;
  title: string;
  description: string;
}
