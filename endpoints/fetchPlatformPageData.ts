import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";

export async function fetchPlatformsPageData(): Promise<PlaformsPageData> {
  try {
    const response = await api.get("/platforms-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface PlaformsPageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      title: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string;
      info_texts: string;
      contactCard1: ContactCard;
      contactCard2: ContactCard;
      modal: Modal;
      footer: Footer;
    };
  };
}

interface ContactCard {
  id: number;
  title: string;
  phoneNumber: string;
  email?: string;
  info_message?: any;
}

interface Modal {
  id: number;
  title: string;
  modal_content: string;
  bottom_close_button_label: string;
}
