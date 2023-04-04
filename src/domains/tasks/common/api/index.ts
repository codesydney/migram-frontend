import axios, { AxiosRequestConfig } from "axios";

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
