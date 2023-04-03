import axios from "axios";

export const getTasksOfCustomerQuery = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
    params: { my_tasks: true },
  });
};
