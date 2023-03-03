import { api } from "@/services/api";

export async function fetchSearchResults(query: string): Promise<any> {
  try {
    const response = await api.get(`/searches?${query}`);

    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface ISearchResults {
  id: number;
  attributes: IPageInfo;
}

interface IPageInfo {
  title: string;
  description: string;
  link: string;
}
