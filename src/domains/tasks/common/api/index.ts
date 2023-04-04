import axios, { AxiosRequestConfig } from "axios";

export const getTasksOfCustomerQuery = (config?: AxiosRequestConfig) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
    ...config,
    params: { my_tasks: true },
  });
};

export async function getTasksQuery(currentPage: number) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
    params,
  });
}
