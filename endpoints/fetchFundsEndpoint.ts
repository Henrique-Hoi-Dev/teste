import { Funds } from "@/interfaces/Fund";
import axios from "axios";

/*
  Suitability
    0 : Não informado
   1 : Conservador
   2: Moderado
   3 : Agressivo
*/

/*Category
  10: Renda fixa
  7 : Multimercado

*/

interface Props {
  limit?: number;
  page?: number;
  name?: string;
  minApplication?: 0 | 1 | 2 | 3 | 4;
  suitability?: 0 | 1 | 2 | 3;
  redemptionSettlementDays?: number | string;
  category?: number | string;
}

export const fetchFundsEndpoints = async (props: Props) => {
  const {
    limit = 10,
    page = 1,
    name = " ",
    minApplication = 4,
    suitability,
    category,
    redemptionSettlementDays = "",
  } = props;

  try {
    const response = await axios.get("/api/funds", {
      params: {
        page,
        name: name,
        limit,
        minApplication,
        suitability,
        anbimaRating: category || "",
        redemptionSettlementDays,
      },
    });

    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
};
