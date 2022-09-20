import axios from "axios";
import type { AxiosRequestConfig } from "axios";


const { REACT_APP_API } = process.env;

export const client = axios.create({
  baseURL: REACT_APP_API,
});

client.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    if (error.message === 'Request failed with status code 401') {
      localStorage.clear()
    }
    return Promise.reject(error)
  }
);

client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
