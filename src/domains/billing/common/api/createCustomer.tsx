import axios from "axios";

export const createCustomer = async (customer: {
  id: string;
  name: string;
  email: string;
}) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/`,
    customer
  );
};
