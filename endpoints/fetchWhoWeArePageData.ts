import { Footer } from "@/interfaces/Footer";
import { StrapiImage } from "@/interfaces/StrapiImage";
import { api } from "@/services/api";
import { Header } from "../interfaces";

export async function fetchWhoWeAreData(): Promise<WhoWeAreData> {
  try {
    const response = await api.get("/who-we-are-page?populate=deep");
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface WhoWeAreData {
  data: {
    id: number;
    attributes: {
      header: Header;
      title: string;
      description: string;
      miraeTitle: string;
      miraeDescription: string;
      mapTitle: string;
      fundamentalValuesTitle: string;
      fundamentalValuesDescription: string;
      cityBackground: StrapiImage;
      graphBackground: StrapiImage;
      wavesBackground: StrapiImage;
      mapCards: IMapCard[];
      numberCards: INumberCard[];
      valueRemarks: IValueRemark[];
      objectiveCards: IObjectiveCard[];
      workWithUs: IWorkWithUs;
      footer: Footer;
    };
  };
}

interface IValueRemark {
  currency: string;
  value: string;
  title: string;
  description: string;
}

interface INumberCard {
  number: string;
  numberLabel: string;
  description: string;
}

interface IObjectiveCard {
  title: string;
  description: string;
  icon: StrapiImage;
}

export interface IMapCard extends IObjectiveCard {
  year: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface IWorkWithUs {
  title: string;
  description: string;
  contactEmail: string;
}
