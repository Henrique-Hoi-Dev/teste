import { api } from "@/services/api";
import { Header } from "@/interfaces/Header";
import { Footer } from "@/interfaces/Footer";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { StrapiFile } from "@/interfaces/StrapiFile";

export interface Response {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      banner: SimpleBanner;
      description: string;
      procuracao: StrapiFile;
      ota: StrapiFile;
      solicitacaoTransferencia: StrapiFile;
      solicitaoTransferenciaValoresMobiliarios: StrapiFile;
    };
  };
}

export async function fetchPortabilityPageData(): Promise<Response> {
  try {
    const response = await api.get("/portability", {
      params: {
        populate: "deep",
      },
    });

    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}
