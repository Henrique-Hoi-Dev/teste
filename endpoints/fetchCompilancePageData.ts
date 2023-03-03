import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { StrapiLink } from "@/interfaces/StrapiLink";
import { StrapiFile } from "@/interfaces/StrapiFile";
import { StrapiImage } from "../interfaces";

export async function fetchCompilancePageData(): Promise<CompilancePageData> {
  try {
    const response = await api.get("/reports-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface CompilancePageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      banner: StrapiImage;
      title: string;
      description: string;
      link: StrapiLink;
      reportsBoxTitle: string;
      searchInputPlaceholder: string;
      reportsCategory: Array<ReportsCategory>;
    };
  };
}

interface ReportsCategory {
  id: number;
  title: string;
  reports: Array<Report>;
}

interface Report {
  id: number;
  title: string;
  media: StrapiFile;
}
