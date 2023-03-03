import { Footer } from "@/interfaces/Footer";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { api } from "@/services/api";
import { Header, StrapiImage } from "../interfaces";

export async function fetchBeAnAdvisorData(): Promise<BeAnAdvisorData> {
  try {
    const response = await api.get("/be-an-advisor?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface BeAnAdvisorData {
  data: {
    id: number;
    attributes: {
      header: Header;
      banner: SimpleBanner;
      cardContent: CardContent;
      product_items_content: Product_items_content;
      form: Form;
      footer: Footer;
    };
  };
}

interface CardContent {
  id: number;
  title: string;
  cards: Array<Card>;
}

interface Product_items_content {
  id: number;
  title: string;
  product_items: Array<Card>;
}

interface Card {
  id: number;
  title: string;
  description: string;
}

export interface Form {
  id: 1;
  title: string;
  labelFullName: string;
  errorMessageFullName: string;
  labelEmail: string;
  errorMessageEmail: string;
  labelCPF: string;
  errorMessageCPF: string;
  labelPhone: string;
  errorMessagePhone: string;
  labelCompanyName: string;
  labelExperienceInAdvisor: string;
  errorMessageExperienceInAdvisor: string;
  labelMessageField: string;
  labelButton: string;
  modal: {
    icon: StrapiImage;
    title: string;
    description: string;
  };
  select: Array<{
    id: number;
    label: string;
    value: string;
  }>;
}
