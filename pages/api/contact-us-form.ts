import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "@/services/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Response | void> {
  try {
    if (req.method === "POST") {
      const { name, email, telephone, message } = req.body?.data;

      const response = await api.post(`/contact-us-forms`, {
        data: {
          name,
          email,
          telephone,
          message,
        },
      });

      return res.json(response.data);
    }

    throw new Error("Invalide HTTP Method");
  } catch (err) {
    let errorMessage = "";
    if (err instanceof Error) errorMessage = err.message;

    return res.status(500).send(errorMessage);
  }
}
