import axios from "axios";

export const fetchTasksQueryURL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/`;

export const fetchTasksQuery = () => {
  return axios.get(fetchTasksQueryURL);
};
