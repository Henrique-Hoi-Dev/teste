import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "@/services/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Response | void> {
  try {
    if (req.method === "POST") {
      const {
        name,
        email,
        phone,
        cpf,
        companyName,
        experienceInAdvisor,
        message,
      } = req.body?.data;

      const response = await api.post(`/be-an-advisor-foms`, {
        data: {
          name,
          email,
          phone,
          cpf,
          companyName,
          experienceInAdvisor,
          message,
        },
      });

      return res.json(response.data);
    }

    return res.status(405).send("Method not allowed");
  } catch (err) {
    let errorMessage = "";
    if (err instanceof Error) errorMessage = err.message;

    return res.status(500).send(errorMessage);
  }
}
