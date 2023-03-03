import { Footer } from "@/interfaces/Footer";
import { Header } from "@/interfaces/Header";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { StrapiLink as Link } from "@/interfaces/StrapiLink";
import { api } from "../services/api";

export async function fetchHomeData(): Promise<HomePageData> {
  try {
    const response = await api.get("/home-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface HomePageData {
  data: {
    id: number;
    attributes: {
      banner1: Banner;
      bannerSimuladorVisible: boolean;
      bannerSimulador: BannerSimulador;
      banner3: Banner;
      investments: Investment[];
      advantagesTitle: string;
      advantages: Advantage[];
      feesList: FeesList;
      negotiationPlatforms: NegotiationPlatforms;
      header: Header;
      footer: Footer;
    };
  };
}

interface BannerSimulador {
  title: string;
  description: string;
  link: Link;
  image: StrapiImage;
}
export interface Banner {
  title: string;
  description: string;
  link: Link;
  background: StrapiImage;
  backgroundMobile?: StrapiImage;
  visible?: boolean;
}

export interface Investment {
  title: string;
  name: string;
  description: string;
  link: Link;
  Image: StrapiImage;
}

export interface Advantage {
  image: StrapiImage;
  title: string;
  description: string;
  link: Link;
}

interface FeesList {
  fees: Fee[];
  details: string;
  link: Link;
  image: StrapiImage;
}

interface Fee {
  title: string;
  amount: number;
  feeType: string;
}

export interface NegotiationPlatforms {
  title: string;
  images: {
    data: {
      id: string;
      attributes: {
        url: string;
      };
    }[];
  };
}
