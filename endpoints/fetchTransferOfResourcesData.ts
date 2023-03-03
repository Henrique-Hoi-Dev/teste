import { Footer } from "@/interfaces/Footer";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";
import { api } from "@/services/api";
import { Header } from "../interfaces";

export async function fetchTransferOfResourcesData(): Promise<TransferOfResourcesData> {
  try {
    const response = await api.get("/transfer-of-resource?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface TransferOfResourcesData {
  data: {
    id: number;
    attributes: {
      header: Header;
      banner: SimpleBanner;
      transfers_itens: TranfersItens;
      info_itens: InfoItens;
      footer: Footer;
    };
  };
}

interface TranfersItens {
  id: number;
  title: string;
  itens: Array<Itens>;
}

interface InfoItens {
  id: number;
  title: string;
  items: Array<Itens>;
}

interface Itens {
  id: number;
  title: string;
  description: string;
}
