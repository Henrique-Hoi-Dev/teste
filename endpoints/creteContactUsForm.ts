import axios from "axios";

interface ContactUsForm {
  name: string;
  email: string;
  telephone: string;
  message: string;
}

export async function createContactUsForm({
  name,
  email,
  telephone,
  message,
}: ContactUsForm): Promise<any> {
  try {
    const response = await axios.post("/api/contact-us-form", {
      data: {
        name,
        email,
        telephone,
        message,
      },
    });

    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}
