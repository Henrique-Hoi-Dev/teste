import axios, { Axios } from "axios";

export const miraeApi: Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MIRAE_API_URL}`,
  withCredentials: false,
  timeout: 5000,
});
