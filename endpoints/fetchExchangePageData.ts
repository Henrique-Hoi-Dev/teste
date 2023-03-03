import { api } from "@/services/api";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { Footer } from "@/interfaces/Footer";
import { Header } from "@/interfaces/Header";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { InfoCardProps } from "@/components/Common/InfoCard";

export async function fetchExchangePageData(): Promise<ExchangePageData> {
  try {
    const response = await api.get("/exchange-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface ExchangePageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      banner: SimpleBanner;
      deliveryFeeInfo: string;
      exchangeVantagesCarousel: Array<{
        id: number;
        title: string;
        description: string;
        image: StrapiImage;
      }>;
      cards: InfoCardProps[];
    };
  };
}
