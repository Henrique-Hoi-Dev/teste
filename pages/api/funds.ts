import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Response | void> {
  try {
    const {
      page = "1",
      name = "",
      limit,
      anbimaRating,
      redemptionSettlementDays,
      minApplication,
      suitability,
    } = req.query;
    const { NEXT_PUBLIC_STRAPI_URL_MIRAE_FUNDS } = process.env;

    const response = await axios.get(
      `${NEXT_PUBLIC_STRAPI_URL_MIRAE_FUNDS}/paged?Page=${page}&Name=${name}&Limit=${limit}&AnbimaRating=${anbimaRating}&MinApplication=${minApplication}&RedemptionSettlementDays=${redemptionSettlementDays}&Suitability=${suitability}`,
      {
        timeout: 5000,
      }
    );

    return res.json(response.data);
  } catch (err) {
    let errorMessage = "";
    if (err instanceof Error) errorMessage = err.message;

    return res.status(500).send(errorMessage);
  }
}
