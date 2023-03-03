import { api } from "@/services/api";
import { Footer } from "@/interfaces/Footer";
import { Header } from "@/interfaces/Header";
import { SimpleBanner } from "@/interfaces/StrapiSimpleBanner";

export async function fetchRLPPageData(): Promise<RLPPageData> {
  try {
    const response = await api.get("/rlp-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface RLPPageData {
  data: {
    id: number;
    attributes: {
      header: Header;
      footer: Footer;
      banner: SimpleBanner;
      title: string;
      description: string;
      title2: string;
      description2: string;
      title3: string;
      description3: string;
      subDescription3: string;
      table: Table;
      titleContinuationRlp: string;
    };
  };
}

export interface Table {
  title: string;
  subTitle: string;
  arrayTable: Array<ArrayTable>;
  arrayTable2: Array<ArrayTable>;
  titleColumn: string;
  titleColumn2: string;
  titleColumn3: string;
  titleColumn4: string;
  titleTableColumn: string;
  titleTable2Column: string;
  labelButtonModal: string;
}

interface ArrayTable {
  id: string;
  column: string;
  column2: string;
  column3: string;
  column4: string;
}
