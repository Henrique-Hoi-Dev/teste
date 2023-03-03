import { miraeApi } from "@/services/miraeApi";

export async function fetchIpoList(): Promise<Response> {
  try {
    const openOffersPromise = miraeApi.get("/Ipo/list/opened");
    const closedOffersPromise = miraeApi.get("Ipo/list/closed");

    const [openOffersResponse, closedOffersResponse] = await Promise.all([
      openOffersPromise,
      closedOffersPromise,
    ]);

    return {
      openOffers: openOffersResponse.data,
      closedOffers: closedOffersResponse.data,
    };
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface Response {
  openOffers: Array<Ipo>;
  closedOffers: Array<Ipo>;
}

export interface Ipo {
  id: number;
  name: string;
  document: string;
  beginReservation: string;
  endReservation: string;
  liquidation: string;
  communicatedCode: number;
  communicatedName: string;
  materialCode: number;
  materialName: string;
}
