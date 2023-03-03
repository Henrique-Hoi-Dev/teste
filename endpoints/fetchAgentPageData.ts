import { api } from "../services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";

export async function fetchAgentPageData(): Promise<AgentPageData> {
  try {
    const response = await api.get("/agent-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface AgentPageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      title: string;
      descriptionWithUrl: DescriptionWithUrl;
      benefits: ContentList;
      frequentlyAskedQuestions: ContentList;
      offices: ToggleContent;
      footer: Footer;
    };
  };
}

export interface DescriptionWithUrl {
  text: string;
  url: string;
  urlLabel: string;
}

export interface ContentList {
  title: string;
  contents: Content[];
}

export interface Content {
  title: string;
  description: string;
}

export interface ToggleContent {
  title: string;
  description: string;
  details: string;
}
