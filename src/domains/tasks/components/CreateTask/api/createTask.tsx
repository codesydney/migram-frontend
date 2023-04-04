import axios from "axios";
import { CreateTaskFormState } from "../types";

export const createTaskURL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/`;

export const createTask = async (data: CreateTaskFormState) => {
  return axios.post(createTaskURL, data);
};
