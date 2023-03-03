import { Footer } from "@/interfaces/Footer";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { StrapiLink } from "@/interfaces/StrapiLink";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { api } from "@/services/api";
import { Header } from "../interfaces";

interface Params {
  locale: string;
}

export async function fetchNonResidentInvestorData(
  props: Params
): Promise<NonResidentInvestorData> {
  const { locale = "en" } = props;

  try {
    const response = await api.get(
      `/non-resident-investor?populate=deep&locale=${locale}`
    );
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface NonResidentInvestorData {
  data: {
    id: number;
    attributes: {
      header: Header;
      banner: SimpleBanner;
      description2: string;
      titleCard: string;
      cards: Array<Card>;
      cardNumber: CardNumber;
      cardInfo: CardInfo;
      titleNRI: string;
      titlePhone: string;
      titleEmail: string;
      graphicTitle: string;
      graphicImage: StrapiImage;
      graphicImageMobile: StrapiImage;
      footer: Footer;
    };
  };
}

interface Card {
  id: number;
  title: string;
  description: string;
  icon: StrapiImage;
}

interface CardNumber {
  title: string;
  cipher: string;
  numberValor: string;
  billion: string;
}

interface CardInfo {
  title: string;
  description: string;
  link: StrapiLink;
  background: StrapiImage;
  backgroundMobile: StrapiImage;
}
