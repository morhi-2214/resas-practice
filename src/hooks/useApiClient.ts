import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
const useApiClient = () => {
  const baseURL = import.meta.env.VITE_API_BASE_DOMAIN;
  const config: AxiosRequestConfig = {
    baseURL,
    headers: {
      "X-API-KEY": import.meta.env.VITE_API_KEY!,
    },
  };

  const repository: AxiosInstance = axios.create(config);
  return repository;
};

export { useApiClient };
