import { miraeFundsApi } from "@/services/api";

interface Props {
  name?: string;
}

export async function fetchInvestmentFundsData(): Promise<InvestmentFundData> {
  try {
    const data = await miraeFundsApi.get("/Funds");
    return data.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}

export interface InvestmentFundData {
  funds: {
    funds: []
  };
}
