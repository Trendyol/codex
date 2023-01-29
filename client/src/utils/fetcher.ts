import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true;

export const fetcher = async (url: any, config?: AxiosRequestConfig) => {
  const res = await axios.get(url, config);
  return res.data;
};

