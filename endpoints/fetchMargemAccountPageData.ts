import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { FrequentlyAskedQuestions } from "@/interfaces/FrequentlyAskedQuestions";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";

export async function fetchMargemAccountPageData(): Promise<MargemAccountData> {
  try {
    const response = await api.get("/margem-account?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface MargemAccountData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      banner: SimpleBanner;
      description: string;
      frequent_question: FrequentlyAskedQuestions;
      bannerFooter: SimpleBanner;
    };
  };
}
