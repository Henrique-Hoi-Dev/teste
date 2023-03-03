import axios from "axios";

interface BeAnAdvisorForm {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  companyName?: string;
  experienceInAdvisor: string[];
  message?: string;
}

export async function creteBeAnAdvisorForm({
  name,
  email,
  phone,
  cpf,
  companyName,
  experienceInAdvisor,
  message,
}: BeAnAdvisorForm): Promise<any> {
  try {
    const response = await axios.post(
      "api/be-an-advisor-form",
      {
        data: {
          name,
          email,
          phone,
          cpf,
          companyName,
          experienceInAdvisor,
          message,
        },
      },
      { timeout: 5000 }
    );

    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}
