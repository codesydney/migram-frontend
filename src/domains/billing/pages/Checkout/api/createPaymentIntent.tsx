import axios from "axios";

export const createPaymentIntentUrl = `${process.env.NEXT_PUBLIC_API_URL}api/v1/releasePayment`;

export const createPaymentIntent = async (taskId: string) => {
  const reponse = await axios.post(createPaymentIntentUrl, {
    taskId,
  });

  return reponse;
};
