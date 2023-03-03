import { api } from "@/services/api";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { Footer } from "@/interfaces/Footer";
import { Header } from "@/interfaces/Header";

export async function fetchFounderData(): Promise<FounderPageData> {
  try {
    const response = await api.get("/founder-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface FounderPageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      title: string;
      description: string;
      banner: StrapiImage;
      achievements: Achievement[];
      speech: Speech;
      principlesHeading: string;
      principles: Principle[];
      footer: Footer;
    };
  };
}

export interface Achievement {
  year: number;
  description: string;
}

export interface Speech {
  title: string;
  description: string;
}

export interface Principle {
  title: string;
  description: string;
  content: string;
  footer: string;
}

export interface Navbar {
  Logo: StrapiImage;
  Links: Link[];
}

export interface Link {
  Url: string;
  Label: string;
}
