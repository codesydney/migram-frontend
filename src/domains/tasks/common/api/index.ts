import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Offer, Task } from "../types";
import {
  Notification,
  createNotification,
} from "src/common/features/notifications";

export type GetTasksOfCustomerReturnType = Promise<{
  tasks: Task[];
  event?: Notification;
}>;

export const getTasksOfCustomerQuery = (
  config?: AxiosRequestConfig
): GetTasksOfCustomerReturnType => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
      ...config,
      params: { my_tasks: true },
    })
    .then((res) => ({
      tasks: res.data.data.tasks,
    }))
    .catch((err) => {
      const notification = createNotification({
        isError: true,
        title: `Failed to fetch tasks. Please refresh the page. If the problem persists, please contact the administrator at ${process.env.ADMIN_EMAIL}`,
        type: "notification",
        status: "critical",
        source: "Mark Task as Completed Failure",
      });

      return { tasks: new Array<Task>(), error: notification };
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

export type GetOffersOfProviderReturnType = Promise<{
  offers: Offer[];
  event?: Notification;
}>;

export async function getOffersOfProviderQuery(
  config?: AxiosRequestConfig
): GetOffersOfProviderReturnType {
  return axios
    .get(getOffersUrl, {
      ...config,
      params: { my_offers: true },
    })
    .then((res) => ({
      offers: res.data.data.offers as Array<Offer>,
    }))
    .catch((error) => {
      const offers = new Array<Offer>();

      if (error instanceof AxiosError) {
        const errorMessage =
          "Failed to load offers. Please contact support if refreshing the page does not work.";

        const notification = createNotification({
          isError: true,
          title: errorMessage,
          type: "notification",
          status: "warning",
          source: "Api Error",
        });

        return { offers, event: notification };
      }

      return { offers };
    });
}
