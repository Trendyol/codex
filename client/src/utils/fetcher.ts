import axios, { AxiosRequestConfig } from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

axios.defaults.baseURL = publicRuntimeConfig.baseUrl;
axios.defaults.withCredentials = true;

export const fetcher = async (url: any, config?: AxiosRequestConfig) => {
  const res = await axios.get(url, config);
  return res.data;
};

