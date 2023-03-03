import { fetchSearchResults } from "@/endpoints/fetchSearchResults";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req;
    const queryString = new URLSearchParams(query as any).toString();

    const results = await fetchSearchResults(queryString);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).send("Error fetching results");
  }
}
