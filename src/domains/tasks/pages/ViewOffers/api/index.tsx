import axios from "axios";

import { Task } from "@Tasks/common";

export const getTasksUrl = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`;

export async function completeOfferMutation(taskId: string) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${taskId}/completed`
  );
}

export async function getTaskQuery(taskId: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${taskId}`
  );

  return response.data.data.task as Task;
}
