import axios, { AxiosError, AxiosResponse } from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...options }: any) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: AxiosError) => error;

  return client(options).then(onSuccess).catch(onError);
};
