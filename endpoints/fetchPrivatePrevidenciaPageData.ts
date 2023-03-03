import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { FrequentlyAskedQuestions } from "@/interfaces/FrequentlyAskedQuestions";
import { StrapiImage } from "../interfaces";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { CardVideo } from "@/interfaces/CardVideo";
import { StrapiLink } from "@/interfaces/StrapiLink";

export async function fetchPrevidenciaPrivadaPageData(): Promise<PrivatePrevidenciaData> {
  try {
    const response = await api.get("/private-previdencia-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface PrivatePrevidenciaData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      title: string;
      banner: SimpleBanner;
      frequentAskedQuestions: FrequentlyAskedQuestions;
      description: string;
      taxingLabel: string;
      graphData: Array<GraphData>;
      cardsSection: {
        title: string;
        cards: Array<{
          id: number;
          title: string;
          description: string;
        }>;
      };
      bottomBanner: SimpleBanner;
      bottomText: string;
      bottomTextLink: StrapiLink;
      videos: CardVideo;
    };
  };
}

interface GraphData {
  id: number;
  type: string;
  title: string;
  legendLabel: string;
  description: string;
  tableHeader: Array<{
    title: string;
  }>;
  data: Array<GraphDataItem>;
}

interface GraphDataItem {
  label: string;
  value: number;
}
