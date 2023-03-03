import { api } from "@/services/api";
import { Footer } from "@/interfaces/Footer";
import { Header } from "@/interfaces/Header";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { CardVideo } from "@/interfaces/CardVideo";

export async function fetchIPOPageData(): Promise<IPOPageData> {
  try {
    const response = await api.get("/ipo-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface IPOPageData {
  data: {
    id: number;
    attributes: IpoDataAttributes;
  };
}

export interface IpoDataAttributes {
  header: Header;
  footer: Footer;
  banner: SimpleBanner;
  informativeText: string;
  bottomBanner: SimpleBanner;
  videos: CardVideo;
  ipoListing: IpoListing;
}

export interface IpoListing {
  title: string;
  labelOpenOffers: string;
  labelClosedOffers: string;
  labelOfferCloseDate: string;
  labelTitle: string;
  labelNoticeToMarket: string;
  labelProspecto: string;
  labelOfferBegin: string;
  labelLiquidation: string;
  labelReserveButton: string;
  atentionText: string;
}
