import { api } from "../services/api";

export async function fetchTradingPlatforms(): Promise<TradingPlatforms> {
  try {
    const response = await api.get(
      "/trading-platforms?populate=deep&sort=title%3Adesc"
    );
    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface Developer {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
}

export interface TradingPlatform {
  attributes: {
    title: string;
    description: string;
    labelButton: string;
    developer: Developer;
  };
}

export interface TradingPlatforms {
  data: Array<TradingPlatform>;
}
