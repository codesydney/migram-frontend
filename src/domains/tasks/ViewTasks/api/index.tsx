import axios from "axios";

export const acceptOfferMutation = (taskId: string, offerId: string) => {
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}api/v1/acceptoffer/`, {
      taskId,
      offerId,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
};

export const getOffersOfTaskQuery = (taskId: string) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${taskId}`);
};

export const getTasksOfCustomerQuery = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`, {
    params: { my_tasks: true },
  });
};
