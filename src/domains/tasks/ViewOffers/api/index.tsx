import { Task, Offer } from "@Tasks/common/types";
import axios from "axios";

export const getOffersUrl = `${process.env.NEXT_PUBLIC_API_URL}api/v1/offers`;
export const getTasksUrl = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`;

export async function completeOfferMutation(taskId: string) {
  axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${taskId}/completed`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export async function getTaskQuery(taskId: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${taskId}`
  );

  return response.data.data.task as Task;
}

export async function getOffersOfProviderQuery() {
  const response = await axios.get(getOffersUrl, {
    params: { my_offers: true },
  });

  return response.data.data.offers as Array<Offer>;
}
