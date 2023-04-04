import axios, { AxiosRequestConfig } from "axios";
import { Offer } from "../types";

export const getTasksOfCustomerQuery = (config?: AxiosRequestConfig) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
    ...config,
    params: { my_tasks: true },
  });
};

export async function getTasksQuery(config?: AxiosRequestConfig) {
  const currentPage = 0;

  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
    ...config,
    params: { page: currentPage, limit: 6 },
  });
}

export const getOffersUrl = `${process.env.NEXT_PUBLIC_API_URL}api/v1/offers`;

export async function getOffersOfProviderQuery() {
  const response = await axios.get(getOffersUrl, {
    params: { my_offers: true },
  });

  return response.data.data.offers as Array<Offer>;
}
