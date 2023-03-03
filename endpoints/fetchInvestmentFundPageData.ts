import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { CardVideo } from "@/interfaces/CardVideo";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";

export async function fetchInvestmentFundPageData(): Promise<InvestmentFundPageData> {
  try {
    const { data } = await api.get("/investment-fund?populate=deep");
    return data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface InvestmentFundPageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      banner: SimpleBanner;
      cardVideo: CardVideo;
      filters: Array<Filters>;
      profitabilityLabel: string;
      graphic: Graphic;
    };
  };
}

export interface Filters {
  id: number;
  title: string;
  key: string;
  options: Array<{
    id: number;
    label: string;
    code: number;
  }>;
}
export interface Graphic {
  id: number;
  title: string;
  title2: string;
  title3: string;
  tableHeader: Array<{
    title: string;
  }>;
  data: Array<GraphDataItem>;
  months: Array<{
    label: string;
    value: number;
  }>;
  months2: Array<{
    label: string;
    value: number;
  }>;
}

interface GraphDataItem {
  label: string;
  value: number;
  value2: number;
  value3: number;
}
