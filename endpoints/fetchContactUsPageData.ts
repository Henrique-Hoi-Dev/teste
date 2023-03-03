import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { FrequentlyAskedQuestions } from "@/interfaces/FrequentlyAskedQuestions";
import { StrapiImage } from "../interfaces";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";

export async function fetchContactUsPageData(): Promise<ContactUsData> {
  try {
    const response = await api.get("/contact-us-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface ContactUsData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      title: string;
      frequent_asked_questions: FrequentlyAskedQuestions;
      contactUsForm: ContactUsForm;
      titleCanaisAtendimento: string;
      titleAtendimento: string;
      modal: {
        image: StrapiImage;
        title: string;
        description: string;
      };
      cards: Array<{
        id: number;
        title: string;
        phoneNumber: string;
        email: string;
        info_message?: string;
      }>;
      cardOuvidoria: {
        title: string;
        content: Array<{
          id: number;
          icon: StrapiImage;
          text: string;
        }>;
      };
      banner: Banner;
    };
  };
}

interface Banner extends SimpleBanner {
  qrCode: StrapiImage;
}

interface ContactUsForm {
  sectionTitle: string;
  title: string;
  labelNameInput: string;
  nameInputErrorMessage: string;
  emailLabel: string;
  emailErrorMessage: string;
  telephoneLabel: string;
  telephoneErrorMessage: string;
  messageLabel: string;
  labelSubmitButton: string;
}
