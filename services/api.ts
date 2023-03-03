import axios, { Axios } from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`;

export const api: Axios = axios.create({
  baseURL,
  timeout: 5000
});

export const miraeFundsApi: Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL_MIRAE_FUNDS}/api/v1`,
});
